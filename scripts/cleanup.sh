#!/bin/bash

###################################
#              ABOUT              #
###################################
# This script is used to ensure that the build folder is clean before publishing
# a new version of the package. The build pipeline uses tsc to compile the
# standardized configs and Rollup to compile and bundle the package assets.
# Hopefully, this script will be unnecessary in the future. But for some reason
# when we try to use Rollup to compile the standardized configs, it removes every
# js file and the type declaration file for the first config (canary) but none of
# the declaration files generated by the remaining configs.

set -e
set -o pipefail

function removeFileIfExists() {
	local path=$1

	if [ -f "$path" ]; then
		rm "$path"
	fi
}

removeFileIfExists ./dist/canary.d.ts
removeFileIfExists ./dist/gitflow.d.ts
removeFileIfExists ./dist/modular.d.ts
removeFileIfExists ./dist/recommended.d.ts
removeFileIfExists ./dist/staged.d.ts
removeFileIfExists ./dist/streamlined.d.ts
