<div id="top"></div>

# 📦 @rob.hameetman/semantic-release-config

<div align="center">
  <a href="https://github.com/RobHameetman/semantic-release-config">
    <img src="./.github/img/logo.png" alt="Logo" width="75" height="112">
  </a>

  <p align="center">
    <br />
    A package for centralized release management configuration.
    <br />
  </p>
  <a href="https://reactjs.org/">
    <img src="https://img.shields.io/badge/React-v18.2.0-%236ADEFE.svg?&logo=react&logoColor=%2361DAFB" alt="React v18.2.0">
  </a>
  <a href="https://www.typescriptlang.org/">
    <img src="https://img.shields.io/badge/TypeScript-v5.2.2-%23007ACC.svg?&logo=typescript&logoColor=007ACC" alt="TypeScript v5.2.2">
  </a>
  <a href="https://rollupjs.org/">
    <img src="https://img.shields.io/badge/Rollup-v4.1.4-EC4A3F.svg?&logo=rollup.js&logoColor=8DD6F9" alt="Rollup v4.1.4">
  </a>
  <br />
  <img src="https://img.shields.io/github/actions/workflow/status/RobHameetman/semantic-release-config/build.yml?branch=main" alt="Build">
  <img src="https://img.shields.io/github/actions/workflow/status/RobHameetman/semantic-release-config/test.yml?branch=main" alt="Tests">
  <img src="https://img.shields.io/github/actions/workflow/status/RobHameetman/semantic-release-config/deploy.yml?branch=main" alt="w">
	<img src="https://img.shields.io/github/v/release/RobHameetman/semantic-release-config?display_name=tag" alt="CI/CD">
  <br />
  <p align="center">
    <br />
    <a href="https://www.npmjs.org/package/@{{scope}}/semantic-release-config">
      <img src="https://img.shields.io/badge/Check%20It%20Out-%239CB0B2.svg?style=for-the-badge" alt="Check It Out">
    </a>
    <a href="https://www.github.com/RobHameetman/semantic-release-config">
      <img src="https://img.shields.io/badge/Request%20A%20Feature-%23AECCB3.svg?style=for-the-badge" alt="Request A Feature">
    </a>
    <a href="https://www.github.com/RobHameetman/semantic-release-config">
      <img src="https://img.shields.io/badge/Report%20A%20Defect-%23FFD0CA.svg?style=for-the-badge" alt="Report A Defect">
    </a>
    <br />
  </p>
  <p align="center">
    <br />
    <a href="#1-overview">Overview</a>
    ·
    <a href="#2-getting-started">Getting Started</a>
    ·
    <a href="#3-development">Development</a>
    ·
    <a href="#4-testing">Testing</a>
    ·
    <a href="#5-publishing">Publishing</a>
    ·
    <a href="#6-contact">Contact</a>
    ·
    <a href="#7-license">License</a>
  </p>
</div>

## §1: Overview

## §2: Getting Started

Follow these steps to get the project up and running on your local machine:

### 1. Prerequisites

- Node v20+
- NPM v9+

### 2. Installation

```bash
git clone git@github.com:RobHameetman/semantic-release-config
cd semantic-release-config
npm run setup
```

### 3. Editor Configuration

For VSCode, save the following as `editor.code-workspace` in the project root
directory:

```json
{
  "folders": [
    {
      "path": "."
    }
  ],
  "settings": {
    "editor.rulers": [
     80,
     120
    ],
    "eslint.nodeEnv": "development",
    "files.autoSave": "onFocusChange",
    "yaml.format.enable": true,
    "yaml.format.singleQuote": true,
  },
}
```

<p align="right"><a href="#top">⬆️ back to top</a></p>

## §3: Development

### NPM Commands

- `npm run build`: Create a production build artifact.
- `npm run format`: Perform static analysis and auto-fix errors.
- `npm run reset`: Perform a full `node_modules/` reset.
- `npm test`: Execute the Jest test suite.

### Environment Variables

**General Options**

| Variable                    | Description                                                                               |
|-----------------------------|-------------------------------------------------------------------------------------------|
| `RELEASE_PLUGIN_PRESET`     | Change the preset used for plugins. Defaults to `conventionalcommits`.[^1]                |
| `RELEASE_PUBLISH_FROM_DIST` | Set to `true` if your build pipeline copies `package.json` into your `dist` folder.       |
| `RELEASE_DEBUG`             | Enable debug mode in `semantic-release`.                                                  |
| `RELEASE_REPOSITORY_URL`    | Set the repo URL used by `semantic-release`. Defaults to your settings in `package.json`. |
| `RELEASE_DRY_RUN`           | Perform a dry run of the release.                                                         |
| `RELEASE_LOCALLY`           | Run `semantic-release` outside of your CI/CD pipeline.                                    |

**Release Rules**

| Variable                             | Description                                                                                              |
|--------------------------------------|----------------------------------------------------------------------------------------------------------|
| `RELEASE_SKIP_README_UPDATES`        | Set to `true` to skip patch increments for README updates if they don't appear in your private registry. |
| `RELEASE_DEPRECATE_AS_MINOR_VERSION` | If `true` the `deprecate: ...` commit type will increment a minor version instead of a patch version.    |
| `RELEASE_VERSION_AS_TYPE`            | Allows you to use a specific version as a commit type (e.g. `1.2.1(release): ...`).                       |

**Custom Commands**
| Variable                             | Description                                                                         |
|--------------------------------------|-------------------------------------------------------------------------------------|
| `RELEASE_EXEC_ANALYZE_COMMITS_CMD`   | A custom shell command to execute during the analyze commits step.                  |
| `RELEASE_EXEC_GENERATE_NOTES_CMD`    | A custom shell command to execute during the generate notes step.                   |
| `RELEASE_EXEC_ADD_CHANNEL_CMD`       | A custom shell command to execute during the add channel step.                      |
| `RELEASE_EXEC_VERIFY_ARTIFACTS_CMD`  | A custom shell command to execute during the verify release step.                   |
| `RELEASE_EXEC_CWD`                   | The path to use as current working directory when executing the shell commands.[^2] |
| `RELEASE_EXEC_FAIL_CMD`              | A custom shell command to execute during the fail step.                             |
| `RELEASE_EXEC_PREPARE_CMD`           | A custom shell command to execute during the prepare step.                          |
| `RELEASE_EXEC_PUBLISH_CMD`           | A custom shell command to execute during the publish step.                          |
| `RELEASE_EXEC_SHELL`                 | The shell to use to run the command. If `true`, runs file inside of a shell.[^3]     |
| `RELEASE_EXEC_SUCCESS_CMD`           | A custom shell command to execute during the success step.                          |
| `RELEASE_EXEC_VERIFY_CONDITIONS_CMD` | A custom shell command to execute during the verify condition step.                 |

**Configuration-specific**

| Variable                 | Config   | Description                                                                                                |
|--------------------------|---------|------------------------------------------------------------------------------------------------------------|
| `RELEASE_CANARY_BRANCH`  | Canary  | The name of your pre-release branch. |
| `RELEASE_CANARY_CHANNEL` | Canary  | The name of the channel your pre-releases are tagged by. |
| `RELEASE_BRANCHES`       | Modular | Used as the base URL for fetching data from the backend. Add more env variables below.                     |
| `RELEASE_MAIN_IS_LATEST` | Modular | Used as the base URL for fetching data from the backend. Add more env variables below.                     |

[^1]: Release rules for the `angular` preset are already included.
[^2]: This path is relative to the path from which semantic-release is running.
      For example if semantic-release runs from `/my-project` and `execCwd` is
      set to `buildScripts` then the shell command will be executed
      from `/my-project/buildScripts`.
[^3]: Uses `/bin/sh` on UNIX and `cmd.exe` on Windows. A different shell can be
      specified as a string. The shell should understand the `-c` switch on UNIX
      or `/d /s /c` on Windows.

<p align="right"><a href="#top">⬆️ back to top</a></p>

## §4: Testing

This project uses the following tiers of testing:

- **Unit & Integration Tests**: Use `npm run test` to run all tests.

These commands accept additional inputs following a `--` modifier as in the
common use-case examples below:

- `npm run test -- --watch`: Watch for changes and re-run all tests.
- `npm run test -- src/path/to/test.spec.ts`: Run tests in a specific test file.

<p align="right"><a href="#top">⬆️ back to top</a></p>

## §5: Publishing

Creating and merging PRs will create new package versions that you can monitor
by vising the _Actions_ tab in Github.

### Channels

- `alpha`: Used for manual testing in other packages
- `beta`: Used for UAT and testing by external consumers
- `next`: Everything that will be included in the next major version release

### Versioning

This project uses [SemVer](http://semver.org/) for versioning. For the versions
available, see the [tags on this repository](https://github.com/RobHameetman/semantic-release-config/tags).

An `beta` pre-release version will be published whenever you create a PR and
incremented as you update your changes. Once the PR is merged, a release version
is created automatically. This is handled with `semantic-release`.

Major versions should have a corresponding release in Github. Click
[here](https://github.com/RobHameetman/semantic-release-config/releases/new) to create a new release
once your version meets acceptance criteria.

<p align="right"><a href="#top">⬆️ back to top</a></p>

## §6: Contact

For inquiries and additional information, please reach out to:

**Rob Hameetman**  
_Front End Architect_ | Chicago, IL  
engineering@robhameetman.com

<p align="right"><a href="#top">⬆️ back to top</a></p>

## §7: License

Distributed under the MIT License.  
See the [LICENSE](LICENSE) file for details.

<p align="right"><a href="#top">⬆️ back to top</a></p>
