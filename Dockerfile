# syntax=docker/dockerfile:1.7-labs
###############################################################################
# alpha-airis-cli — airis image
#
# Stages:
#   natives-builder — Rust + Bun → airis_natives.linux-<arch>.node
#   wheel-builder   — airis_rpc Python wheel
#   airis-base         — python + bun + rustup launcher + natives + airis_rpc
#                     + /usr/local/bin/airis.shim
#   airis-runtime      — airis-base + airis source + bun install      (DEFAULT, runnable)
#
# Build:
#     docker build -t airis/airis:dev .                          # default = airis-runtime
#     docker build --target airis-base -t airis/airis-base:dev .    # base for derived images
#
# Run:
#     docker run --rm airis/airis:dev --help
#     docker run --rm -it -v "$PWD":/work airis/airis:dev cli    # interactive airis
#
# Consume as a base in another Dockerfile (see Dockerfile.roboairis):
#     ARG AIRIS_BASE=airis/airis:dev
#     FROM ${AIRIS_BASE} AS airis-base
###############################################################################

ARG BUN_VERSION=1.3.14

############################
# 1) natives-builder — Rust + Bun → airis_natives.linux-<arch>.node
############################
FROM rust:1.86-slim-bookworm AS natives-builder

ARG BUN_VERSION
ENV BUN_INSTALL=/opt/bun \
    PATH=/opt/bun/bin:/usr/local/cargo/bin:/usr/local/bin:/usr/bin:/bin \
    CARGO_TERM_COLOR=never

# clang/libclang-dev: bindgen for maudio-sys (miniaudio); cmake/make/ninja-build:
# audiopus_sys builds bundled libopus via CMake (native audio stack, 17.1.1+).
# bazelisk: hermetic bazel launcher for the native addon build (17.1.5+).
RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        curl ca-certificates pkg-config libssl-dev unzip git \
        clang libclang-dev cmake make ninja-build \
    && rm -rf /var/lib/apt/lists/* \
    && curl -fsSL -o /usr/local/bin/bazelisk \
        "https://github.com/bazelbuild/bazelisk/releases/download/v1.25.0/bazelisk-linux-$(dpkg --print-architecture)" \
    && chmod +x /usr/local/bin/bazelisk \
    && ln -s /usr/local/bin/bazelisk /usr/local/bin/bazel

RUN curl -fsSL https://bun.sh/install | bash -s "bun-v${BUN_VERSION}" \
    && /opt/bun/bin/bun --version

WORKDIR /airis

# Layer 1 — manifests + lockfiles only. Source edits under packages/*/src and
# crates/*/src won't bust `bun install` below. `--parents` preserves the
# matched path under /airis/ (requires syntax 1.7-labs).
COPY --parents \
    package.json bun.lock bunfig.toml \
    patches/*.patch \
    tsconfig.base.json tsconfig.json \
    Cargo.toml Cargo.lock rust-toolchain.toml \
    packages/*/package.json \
    packages/tsconfig.workspace.json \
    python/roboairis/web/package.json \
    crates/*/Cargo.toml \
    /airis/

# Layer 2 — hydrate node_modules from the manifests above.
RUN bun install --frozen-lockfile --ignore-scripts

# Layer 3 — full source. `Dockerfile.dockerignore` keeps target/, node_modules/,
# dist/, runs/, editor noise, etc. out of the context. node_modules from Layer 2
# is preserved across this COPY because it's never in the build context.
COPY . /airis/

# Layer 4 — compile airis-natives to a Linux N-API addon. Persistent caches keep
# repeat builds incremental: cargo's package index + git-deps + the workspace
# target dir.
RUN --mount=type=cache,target=/root/.cargo/registry \
    --mount=type=cache,target=/root/.cargo/git \
    --mount=type=cache,target=/airis/target \
    set -eux; \
    rustup show; \
    bun --cwd=packages/natives run build; \
    mkdir -p /out; \
    cp packages/natives/native/airis_natives.linux-*.node /out/

############################
# 2) wheel-builder — airis-rpc wheel
############################
FROM python:3.12-slim-bookworm AS wheel-builder

RUN apt-get update \
    && apt-get install -y --no-install-recommends git \
    && rm -rf /var/lib/apt/lists/*

RUN pip install --upgrade pip build

WORKDIR /src
COPY python/airis-rpc /src
RUN python -m build --wheel --outdir /out

############################
# 3) airis-base — python + bun + rustup + natives + airis_rpc + airis.shim
#
# Sharable runtime base. Derived images (airis-runtime below, Dockerfile.roboairis)
# extend this and overlay their own source tree. Default AIRIS_ROOT=/work/airis is
# friendly to derived images that mount a host airis checkout there; airis-runtime
# overrides it to /airis because its source is baked in.
############################
FROM python:3.12-slim-bookworm AS airis-base

ARG BUN_VERSION
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PIP_NO_CACHE_DIR=1 \
    PIP_DISABLE_PIP_VERSION_CHECK=1 \
    BUN_INSTALL=/opt/bun \
    AIRIS_ROOT=/work/airis \
    CARGO_HOME=/data/cache/cargo \
    CARGO_TARGET_DIR=/data/cache/cargo-target \
    RUSTUP_HOME=/data/cache/rustup \
    PATH=/opt/bun/bin:/usr/local/cargo/bin:/usr/local/bin:/usr/bin:/bin

RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        git curl ca-certificates unzip openssh-client tini sqlite3 \
        build-essential pkg-config libssl-dev \
    && rm -rf /var/lib/apt/lists/*

RUN curl -fsSL https://bun.sh/install | bash -s "bun-v${BUN_VERSION}" \
    && /opt/bun/bin/bun --version

# Rustup launcher only — the real toolchain is fetched lazily into RUSTUP_HOME
# on first cargo invocation, driven by airis's `rust-toolchain.toml`. Keeps the
# image small while sharing the toolchain across reboots when /data is mounted.
RUN curl -fsSL https://sh.rustup.rs -o /tmp/rustup-init.sh \
    && CARGO_HOME=/usr/local/cargo RUSTUP_HOME=/usr/local/rustup-bootstrap \
       sh /tmp/rustup-init.sh -y --no-modify-path --default-toolchain none --profile minimal \
    && rm -f /tmp/rustup-init.sh \
    && rm -rf /usr/local/rustup-bootstrap \
    && /usr/local/cargo/bin/rustup --version

# airis-natives addon: airis's loader probes /opt/bun/bin as a fallback path.
COPY --from=natives-builder /out/airis_natives.linux-*.node /opt/bun/bin/

# airis-rpc Python wheel.
COPY --from=wheel-builder /out/*.whl /tmp/wheels/
RUN pip install /tmp/wheels/airis_rpc-*.whl && rm -rf /tmp/wheels

# `airis` shim — runs the coding-agent CLI against $AIRIS_ROOT via Bun. Derived
# images override AIRIS_ROOT to point at wherever their airis source lives.
RUN printf '%s\n' \
    '#!/usr/bin/env bash' \
    'set -euo pipefail' \
    ': "${AIRIS_ROOT:=/work/airis}"' \
    'if [ ! -d "$AIRIS_ROOT/packages/coding-agent" ]; then' \
    '  echo "airis: AIRIS_ROOT=$AIRIS_ROOT does not look like a airis checkout" >&2' \
    '  exit 127' \
    'fi' \
    'exec bun "$AIRIS_ROOT/packages/coding-agent/src/cli.ts" "$@"' \
    > /usr/local/bin/airis \
    && chmod +x /usr/local/bin/airis

############################
# 4) airis-runtime — airis-base + airis source + bun install (DEFAULT)
#
# A self-contained, runnable airis image. `docker run airis/airis:dev --help`
# Just Works without a host checkout.
############################
FROM airis-base AS airis-runtime

ENV AERIS_ROOT=/airis
WORKDIR /airis

# Same manifests-only layered install pattern as natives-builder — `bun install`
# only re-runs when a package.json / lockfile changes.
COPY --parents \
    package.json bun.lock bunfig.toml \
    patches/*.patch \
    tsconfig.base.json tsconfig.json \
    packages/*/package.json \
    packages/tsconfig.workspace.json \
    python/roboairis/web/package.json \
    /airis/

RUN bun install --frozen-lockfile --ignore-scripts

# Pi source. `Dockerfile.dockerignore` keeps **/node_modules out of the context
# so stale isolated-linker symlinks from a host install can't shadow the
# hoisted node_modules that `bun install` just produced.
COPY . /airis/

# Regenerate the tool views that `--ignore-scripts` skipped above. The root
# package.json's `prepare` script normally handles these on a vanilla install.
RUN bun --cwd=packages/coding-agent run gen:tool-views

ENTRYPOINT ["/usr/bin/tini", "--", "/usr/local/bin/airis"]
CMD ["--help"]
