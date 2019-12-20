# Shared UI [![npm version](https://img.shields.io/npm/v/@wpmudev/shared-ui.svg)](https://www.npmjs.com/package/@wpmudev/shared-ui) [![Build Status](https://travis-ci.org/wpmudev/shared-ui.svg?branch=master)](https://travis-ci.org/wpmudev/shared-ui)

For internal use in [WPMU DEV](https://wpmudev.org) plugins.

## Usage

See [showcase](https://wpmudev.github.io/shared-ui/).


##### Example plugin integration using webpack
See [example plugin](https://bitbucket.org/incsub/shared-ui-example-plugin/src).


## Contributing
Please read through our [contributing guidelines](https://github.com/wpmudev/shared-ui/blob/master/CONTRIBUTING.md).


## Releasing a new version
1. Go to `development` branch.
2. Update CHANGELOG.md and update the commits to be logical and nice adding DEV NOTES where applicable.
3. Run either `npm run release:patch`, `npm run release:minor` or `npm run release:major` based on the version you want.
4. Go to `master` branch (without pushing commits and make sure there are no residual folders nor files from `development` branch).
5. Run `git tag v2.6.0` to replace the version number with the new version.
6. Push the new tag running `git push --tags`.
7. You will need to be added to the npm packages as a contributor before the next step.
8. Run `npm run publish`.

DONE :)