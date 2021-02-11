#!/usr/bin/env bash
set -eufxo pipefail

NETLIFY_OUTPUT=$(netlify "$@")

NETLIFY_URL=$(grep -Eo '(http|https)://[a-zA-Z0-9./?=_-]*(--)[a-zA-Z0-9./?=_-]*' \
                   <<< "$NETLIFY_OUTPUT")
NETLIFY_LOGS_URL=$(grep -Eo '(http|https)://app.netlify.com/[a-zA-Z0-9./?=_-]*' \
                        <<< "$NETLIFY_OUTPUT")
NETLIFY_LIVE_URL=$(grep -Eo '(http|https)://[a-zA-Z0-9./?=_-]*' \
                        <<< "$NETLIFY_OUTPUT" \
                        | grep -Eov "netlify.com")

set +x
echo "::set-output name=NETLIFY_OUTPUT::$NETLIFY_OUTPUT"
echo "::set-output name=NETLIFY_URL::$NETLIFY_URL"
echo "::set-output name=NETLIFY_LOGS_URL::$NETLIFY_LOGS_URL"
echo "::set-output name=NETLIFY_LIVE_URL::$NETLIFY_LIVE_URL"
