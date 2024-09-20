#!/bin/bash
set -e

LAST_COMMIT_MESSAGE=$(git log -1 --pretty=%B)

echo $LAST_COMMIT_MESSAGE

cleanup() {
	git push --delete origin $E2E_TEST_VERSION

	if [ "$CI_COMMIT_BRANCH" != "main" ] && [ "$CI_COMMIT_BRANCH" != "master" ]; then
		git checkout -b $CI_COMMIT_BRANCH
	fi
}

# Load environment variables from env.list file
if [ -f env.list ]; then
  source env.list
fi

# Cleanup the git repository
trap cleanup EXIT

# Set the version to the E2E_TEST_VERSION environment variable
if [ "$E2E_TEST_VERSION" != "0.0.1" ]; then
	sed s/0.0.1/$E2E_TEST_VERSION/g ./package.json > ./package.json.tmp
	mv ./package.json.tmp ./package.json

	git reset --soft HEAD~1
	git add ./package.json
	git commit --no-verify -m "$LAST_COMMIT_MESSAGE"
fi

ssh-keyscan -t ecdsa github.com 2>&1 |ssh-keygen -lf -

git tag -a $E2E_TEST_VERSION -m "$E2E_TEST_VERSION"
git push --tags

# Set the branch to the CI_COMMIT_BRANCH environment variable
if [ "$CI_COMMIT_BRANCH" != "main" ] && [ "$CI_COMMIT_BRANCH" != "master" ]; then
	git checkout -b $CI_COMMIT_BRANCH
fi

# Make a minor change to index.js and index.mjs
printf "console.log('hello, world!');\n" >> ./index.js
printf "console.log('hello, world!');\n" >> ./index.mjs

# Stage and commit the changes with a commitlint type
git add ./index.js ./index.mjs
git commit -m "fix: minor change to index.js and index.mjs"

# Run the semantic-release dry-run
npx --yes semantic-release --dry-run
