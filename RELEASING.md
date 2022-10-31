---
layout: untitled
title: Releasing
permalink: /releasing/
---

# Releasing

## Prepare development branch.

1. Go to `development` branch.
2. Open `CHANGELOG.md` file.
3. Make sure all changes are properly listed in **changelog** adding DEV NOTES where applicable.

## Build library and showcase files.

Run either `npm run release:patch`, `npm run release:minor` and `npm run release:major` based on the version you want.

**Note:** Do not interact with any of the project's version numbers in a direct way. The following commands handle all aspects of releasing the next version. Once ran, they will auto update `package.json` and `_config.yml` with all the asset query strings with the next corresponding [semver](https://semver.org/) version. They will then build the new files, create a commit and push them to the repo.

## Updating the Shared UI Package.

**Requirements:**

- Must be a developer member of the [WPMU DEV Organization](https://www.npmjs.com/package/@wpmudev/shared-ui/) on npm.
- Must be on `master` branch with a clean working directory.

1. Go to `master` branch (do not push commits directly to this branch and make sure there are no residual folders nor files form `release/**` branches).
2. Run `git tag v{version-number}` replacing `{version-number}` with the new version, for example `2.6.0`.
3. Push the new tag running `git push --tags`.
4. Run `npm publish` to release new package.
