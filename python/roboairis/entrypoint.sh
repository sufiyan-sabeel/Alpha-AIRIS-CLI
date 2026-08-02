#!/usr/bin/env bash
# roboairis container entrypoint. No per-boot pip installs — everything is baked
# into the image; we only sanity-check the runtime mount and create state dirs.
#
# Used by both the orchestrator (CMD: `python -m roboairis serve`) and the
# sibling gh-proxy (compose command: `python -m roboairis.proxy serve`). The
# proxy role does NOT need an $AIRIS_ROOT airis checkout — it never runs airis.
set -euo pipefail

# Shared git metadata under /data/workspaces/_pool is intentionally group
# writable by the `airis` group so interrupted work can resume on a different
# slot user. Keep new files and directories compatible with that model.
umask 0002

# Detect the proxy role by inspecting the command. Compose passes `command:`
# as $@ here (after tini --), so $1=python, $2=-m, $3=roboairis.proxy is the
# canonical shape; we also accept a single concatenated arg for safety.
is_proxy_role=0
if [ "${1:-}" = "python" ] && [ "${2:-}" = "-m" ] && [[ "${3:-}" == roboairis.proxy* ]]; then
    is_proxy_role=1
elif [[ "${1:-}" == *"roboairis.proxy"* ]]; then
    is_proxy_role=1
fi

/usr/sbin/groupadd -f -g 2000 airis
max_slots="${ROBOAIRIS_MAX_CONCURRENCY:-8}"
for i in $(seq 1 "$max_slots"); do
    user="airis-$i"
    slot_group="airis-$i"
    slot_id=$((2000 + i))
    /usr/sbin/groupadd -f -g "$slot_id" "$slot_group"
    id -u "$user" >/dev/null 2>&1 || /usr/sbin/useradd -u "$slot_id" -g "$slot_group" -G airis -M -N -s /usr/sbin/nologin "$user"
    /usr/sbin/usermod -g "$slot_group" -a -G airis "$user"
done

if [ "$is_proxy_role" -eq 1 ]; then
    exec "$@"
fi

: "${AIRIS_ROOT:=/work/airis}"
if [ ! -d "$AIRIS_ROOT/packages/coding-agent" ]; then
    echo "roboairis: AIRIS_ROOT=$AIRIS_ROOT does not look like an airis checkout (no packages/coding-agent/)" >&2
    exit 1
fi

mkdir -p /data/workspaces /data/workspaces/_pool /data/logs
# Persistent build caches under the /data volume. CARGO_HOME,
# CARGO_TARGET_DIR, and RUSTUP_HOME are pinned to these paths in the image ENV
# so every per-issue worktree shares one cargo target/toolchain. Bun install
# cache is workspace-private; a shared cache is unsafe across slot users
# because bun may chmod/chown its cache root to the first writer.
mkdir -p /data/cache/cargo /data/cache/cargo-target /data/cache/rustup /data/cache/airis-natives
chown -R root:airis /data/cache /data/workspaces/_pool
find /data/cache /data/workspaces/_pool -type d -exec chmod 2770 {} +
find /data/cache /data/workspaces/_pool -type f -perm /111 -exec chmod 0770 {} +
find /data/cache /data/workspaces/_pool -type f ! -perm /111 -exec chmod 0660 {} +
chmod 0700 /data/logs


rm -rf /srv/agent-home/.agent /srv/agent-home/.airis/agent
mkdir -p /srv/agent-home/.agent /srv/agent-home/.airis/agent
if [ -e /srv/agent-home-stage/.agent ]; then
    cp -a /srv/agent-home-stage/.agent/. /srv/agent-home/.agent/
fi
if [ -e /srv/agent-home-stage/.airis/agent ]; then
    cp -a /srv/agent-home-stage/.airis/agent/. /srv/agent-home/.airis/agent/
fi
chown -R root:root /srv/agent-home || true
find /srv/agent-home -type d -exec chmod 0755 {} +
find /srv/agent-home -type f -exec chmod 0644 {} +

# airis registers daemon project presence under ~/.airis/run at startup, nesting
# per-project dirs (daemons/<hash>/clients) that any slot user must be able to
# create and enter regardless of which slot first made them: setgid + group
# airis keeps the whole tree group-writable (entrypoint umask 0002 carries into
# slot processes, so new entries stay group-writable too).
mkdir -p /srv/agent-home/.airis/run
chgrp -R airis /srv/agent-home/.airis/run
chmod -R g+rwX /srv/agent-home/.airis/run
find /srv/agent-home/.airis/run -type d -exec chmod g+s {} +
chmod 2770 /srv/agent-home/.airis/run

touch /data/roboairis.sqlite
chown root:root /data/roboairis.sqlite
chmod 0600 /data/roboairis.sqlite
for db_file in /data/roboairis.sqlite-wal /data/roboairis.sqlite-shm; do
    if [ -e "$db_file" ]; then
        chown root:root "$db_file"
        chmod 0600 "$db_file"
    fi
done

exec "$@"
