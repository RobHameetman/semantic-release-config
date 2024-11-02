################################################################################
# Stage 1: Build                                                               #
################################################################################
FROM node:22.3.0 AS build

ARG HOME=/root
ENV HOME=${HOME}

ARG CACHE_BUST
ENV CACHE_BUST=${CACHE_BUST}

ARG THIS_PACKAGE=@rob.hameetman/semantic-release-config
ENV THIS_PACKAGE=${THIS_PACKAGE}

# Set the working directory
WORKDIR $HOME

# Process environment variables
COPY ./test/e2e/.env ./

RUN touch $HOME/env.list && \
grep -v '^#' .env | xargs -I {} echo export {} >> $HOME/env.list

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install --force

# Copy the rest of the application code to the working directory
COPY ./lib ./ \
# ./test/e2e/entrypoint.sh ./ \
./rollup.config.js ./ \
./tsconfig.json ./

# Copy this separately at least while we figure out how this should work
COPY ./test/e2e/entrypoint.sh ./

# Build the TypeScript project
RUN npm run build

################################################################################
# Stage 2: E2E                                                                 #
################################################################################
FROM rhameetman/gh-node AS e2e

ARG E2E_TEST_VERSION=1.0.0
ENV E2E_TEST_VERSION=${E2E_TEST_VERSION}

ARG HOME=/root
ENV HOME=${HOME}

ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}

ARG TEST_DIR=test-package
ENV TEST_DIR=${TEST_DIR}

ARG TEST_REPO=RobHameetman/$TEST_DIR
ENV TEST_REPO=${TEST_REPO}

ARG THIS_PACKAGE=@rob.hameetman/semantic-release-config
ENV THIS_PACKAGE=${THIS_PACKAGE}

# Set the working directory
WORKDIR $HOME

# Install necessary tools for git
RUN apt-get update && \
    apt-get install -y --no-install-recommends git ca-certificates openssh-client && \
		apt-get clean && \
		rm -rf /var/lib/apt/lists/* && \
		# Clone the test repository
		git clone git@github.com:$TEST_REPO.git && \
		chown -R robhameetman:engineering $HOME/$TEST_DIR && \
		# Setup the @rob.hameetman/semantic-release-config package
		mkdir -p $HOME/$TEST_DIR/node_modules/$THIS_PACKAGE

WORKDIR $HOME/$TEST_DIR/node_modules/$THIS_PACKAGE

# Copy the build output from the build stage
COPY --from=build --chown=robhameetman:engineering $HOME/dist/* ./

WORKDIR $HOME/$TEST_DIR

# RUN npm i

COPY --from=build --chown=robhameetman:engineering $HOME/env.list ./
COPY --from=build --chown=robhameetman:engineering $HOME/entrypoint.sh ./entrypoint.sh

RUN mkdir $HOME/.npm && \
		# curl -s https://gist.githubusercontent.com/a-abella/9d6c91a56a892e4c74933d17d380aa01/raw/0bcaef131f94e4938cb659d744c3019fd814643e/strip_github.sh | bash -s -- $HOME/.ssh/known_hosts && \
		# ssh-keyscan -t rsa github.com >> ~/.ssh/known_hosts && \
		chmod +x entrypoint.sh

# RUN chown -R robhameetman:engineering $HOME/.npm && \
# 		chmod +x entrypoint.sh

# Switch to the non-root user
USER robhameetman

# Set the entrypoint to the script
ENTRYPOINT ["./entrypoint.sh"]

# Define a health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s CMD node -e "require('http').get('http://localhost:3000/health', res => process.exit(res.statusCode === 200 ? 0 : 1)).on('error', () => process.exit(1))"
