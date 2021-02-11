#!/bin/bash

read -r -d '' COMMAND <<- EOF
  if [ -f "$HOME/ignore" ] && grep "^ignore:$BUILD_DIR" "$HOME/ignore"; then
    echo "$BUILD_DIR didn't change"
  else
    ${BUILD_COMMAND:-echo} && netlify $*
  fi
EOF

NETLIFY_OUTPUT=$(sh -c "$COMMAND")

NETLIFY_URL=$(grep -Eo '(http|https)://[a-zA-Z0-9./?=_-]*(--)[a-zA-Z0-9./?=_-]*' \
                   <<< "$NETLIFY_OUTPUT")
NETLIFY_LOGS_URL=$(grep -Eo '(http|https)://app.netlify.com/[a-zA-Z0-9./?=_-]*' \
                        <<< echo "$NETLIFY_OUTPUT")
NETLIFY_LIVE_URL=$(grep -Eo '(http|https)://[a-zA-Z0-9./?=_-]*' \
                        <<< echo "$NETLIFY_OUTPUT" \
                        | grep -Eov "netlify.com")

echo "::set-output name=NETLIFY_OUTPUT::$NETLIFY_OUTPUT"
echo "::set-output name=NETLIFY_URL::$NETLIFY_URL"
echo "::set-output name=NETLIFY_LOGS_URL::$NETLIFY_LOGS_URL"
echo "::set-output name=NETLIFY_LIVE_URL::$NETLIFY_LIVE_URL"
