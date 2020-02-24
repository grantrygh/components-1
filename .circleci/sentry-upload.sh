export SENTRY_AUTH_TOKEN=$SENTRY_API_KEY
export SENTRY_URL=https://sentry.audent.io
export SENTRY_RELEASE=$CIRCLE_SHA1
export SENTRY_NO_PROGRESS_BAR=1

sentry-cli releases -o audentio -p audent-io new ${SENTRY_RELEASE}

sentry-cli releases\
    -o audentio\
    -p audent-io files\
    ${SENTRY_RELEASE} upload-sourcemaps ./dist/client --url-prefix '~/dist' --ignore *.css.map

sentry-cli releases\
    -o audentio\
    -p audent-io files\
    ${SENTRY_RELEASE} upload-sourcemaps ./dist/server --url-prefix '~/dist' --ignore *.css.map

sentry-cli releases\
    -o audentio\
    -p audent-io set-commits\
    ${SENTRY_RELEASE} --commit "Audentio/audent-io@$CIRCLE_SHA1"

sentry-cli releases\
    -o audentio\
    -p audent-io deploys\
    ${SENTRY_RELEASE} new -e ${CIRCLE_BRANCH}
