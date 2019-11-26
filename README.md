# Shared UI [![npm version](https://img.shields.io/npm/v/@wpmudev/shared-ui.svg)](https://www.npmjs.com/package/@wpmudev/shared-ui) [![Build Status](https://travis-ci.org/wpmudev/shared-ui.svg?branch=master)](https://travis-ci.org/wpmudev/shared-ui)

For internal use in [WPMU DEV](https://wpmudev.org) plugins.

## Usage

See [showcase](https://wpmudev.github.io/shared-ui/).


##### Example plugin integration using webpack
See [example plugin](https://bitbucket.org/incsub/shared-ui-example-plugin/src).


## Contributing
Please read through our [contributing guidelines](https://github.com/wpmudev/shared-ui/blob/master/CONTRIBUTING.md).


## Releasing a new version
1. Update CHANGELOG.md and update the commits to be logical and nice adding DEV NOTES where applicable.
2. Run either `npm run release:patch`, `npm run release:minor` or `npm run release:major` based on the version you want.
3. Add a git tag `git tag v2.3.0` replace the version number with the new version.
4. Push the tag `git push --tags`.
5. You will need to be added to the npm package as a contributor before the next step.
6. Go to `_dist/library/` folder.
7. Run `npm run publish`.

DONE :)