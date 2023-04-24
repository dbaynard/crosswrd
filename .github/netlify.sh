#!/usr/bin/env bash
set -eufxo pipefail

netlify --telemetry-disable

NETLIFY_OUTPUT=$(netlify "$@")

NETLIFY_URL=$(grep -Eo '(http|https)://[a-zA-Z0-9./?=_-]*(--)[a-zA-Z0-9./?=_-]*' \
                   <<< "$NETLIFY_OUTPUT")
NETLIFY_LOGS_URL=$(grep -Eo '(http|https)://app.netlify.com/[a-zA-Z0-9./?=_-]*' \
                        <<< "$NETLIFY_OUTPUT")
NETLIFY_LIVE_URL=$(grep -Eo '(http|https)://[a-zA-Z0-9./?=_-]*' \
                        <<< "$NETLIFY_OUTPUT" \
                        | grep -Eov "netlify.com")

declare EOF
EOF="$(head -c8 /dev/random | od -A none -t x8)"

set +x

cat <<- EOF >> "$GITHUB_OUTPUT"
NETLIFY_OUTPUT<<$EOF
$NETLIFY_OUTPUT
$EOF
NETLIFY_URL=$NETLIFY_URL
NETLIFY_LOGS_URL=$NETLIFY_LOGS_URL
NETLIFY_LIVE_URL=$NETLIFY_LIVE_URL
EOF
