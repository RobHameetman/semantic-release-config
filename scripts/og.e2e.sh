#!/bin/bash

###################################
#              ABOUT              #
###################################
# Import the environment variables from the .env file and run semantic-release
# in dry-run mode. This script is used to test and debug configurations before
# publishing a new version of the package.

set -e
set -o pipefail

set -o allexport
source $(pwd)/test/e2e/.env
set +o allexport

npx semantic-release --dry-run --no-ci --debug
