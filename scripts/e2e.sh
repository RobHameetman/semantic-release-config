#!/bin/bash

###################################
#              ABOUT              #
###################################
# Import the environment variables from the .env file and run semantic-release
# in dry-run mode. This script is used to test and debug configurations before
# publishing a new version of the package.

set -e
set -o pipefail

docker buildx build -t semantic-release-config-e2e -f $(pwd)/test/e2e/Dockerfile --build-arg THIS_PACKAGE=$npm_package_name --build-arg THIS_VERSION=$npm_package_version --build-arg CACHE_BUST=$(date +%s) .
docker run -t --rm semantic-release-config-e2e

# set -o allexport
# source $(pwd)/test/e2e/.env
# set +o allexport

# npx semantic-release --dry-run --no-ci --debug
