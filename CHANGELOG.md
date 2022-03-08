# Change Log

All notable changes to this project will be documented in this file. See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

## [2.12.4](https://github.com/wpmudev/shared-ui/compare/v2.12.3...v2.12.4) (2022-03-03)

#### 🐛 Bug Fixes
* **fix(uploads):** Hoisting of functions declared in blocks is handled differently in different browsers. [#458](https://github.com/wpmudev/shared-ui/pull/458) ([SUI-302](https://incsub.atlassian.net/browse/SUI-302)) ([@creador-dev](https://github.com/creador-dev))
* **fix(tabs):** Function `init` has no return statements. [#464](https://github.com/wpmudev/shared-ui/pull/464) ([SUI-310](https://incsub.atlassian.net/browse/SUI-310)) ([@iamleigh](https://github.com/iamleigh))
* **fix(multistrings):** Undefined is not a possible return value of `typeof`. [#465](https://github.com/wpmudev/shared-ui/pull/465) ([SUI-309](https://incsub.atlassian.net/browse/SUI-309)) ([@iamleigh](https://github.com/iamleigh))
* **fix(tabs):** Function `setCallback` takes 0 parameter(s). [#466](https://github.com/wpmudev/shared-ui/pull/466) ([SUI-312](https://incsub.atlassian.net/browse/SUI-312)) ([@iamleigh](https://github.com/iamleigh))
* **fix(tabs):** On `keyDownEventListener` the body of `case` clause duplicates. [#467](https://github.com/wpmudev/shared-ui/pull/467) ([SUI-313](https://incsub.atlassian.net/browse/SUI-313)) ([@iamleigh](https://github.com/iamleigh))
* **fix(modals):** If statement have duplicate bodies. [#469](https://github.com/wpmudev/shared-ui/pull/469) ([SUI-311](https://incsub.atlassian.net/browse/SUI-311)) ([@iamleigh](https://github.com/iamleigh))

#### 🚀 Improvements
* **fix(select):** Use arrow function instead of anonymous function. [#70](https://github.com/wpmudev/shared-ui/pull/470) ([SUI-318](https://incsub.atlassian.net/browse/SUI-318)) ([@iamleigh](https://github.com/iamleigh))

#### 🏠 Internal
* **fix(snyk):** Duplicated import in package.json file. [#455](https://github.com/wpmudev/shared-ui/pull/455) ([SUI-298](https://incsub.atlassian.net/browse/SUI-298)) ([@iamleigh](https://github.com/iamleigh))

#### Committers: 2
- Leighton Sapir ([@iamleigh](https://github.com/iamleigh))
- Pawan Kumar ([@creador-dev](https://github.com/creador-dev))

## [2.12.3](https://github.com/wpmudev/shared-ui/compare/v2.12.2...v2.12.3) (2022-02-25)

#### 🐛 Bug Fixes
* **fix(modals):** When the title gets center-aligned, it cuts off with an ellipsis. [#448](https://github.com/wpmudev/shared-ui/pull/448) ([SUI-175](https://incsub.atlassian.net/browse/SUI-175)) ([@creador-dev](https://github.com/creador-dev))
* **fix(select2):** Multi-select with fixed height. [#461](https://github.com/wpmudev/shared-ui/pull/461) ([SUI-177](https://incsub.atlassian.net/browse/SUI-177)) ([@creador-dev](https://github.com/creador-dev))

#### 📝 Documentation
* **docs(color-picker):** Auto-fill does whatever it wants. [#462](https://github.com/wpmudev/shared-ui/pull/462) ([SUI-175](https://incsub.atlassian.net/browse/SUI-175)) ([@creador-dev](https://github.com/creador-dev))

#### Committers: 1
- Pawan Kumar ([@creador-dev](https://github.com/creador-dev))

## [2.12.2](https://github.com/wpmudev/shared-ui/compare/v2.12.1...v2.12.2) (2021-12-23)

#### 🐛 Bug Fixes
* **fix:** RTL styles not being applied. [#405](https://github.com/wpmudev/shared-ui/pull/405) ([SUI-278](https://incsub.atlassian.net/browse/SUI-278)) ([@iamleigh](https://github.com/iamleigh))

#### Committers: 1
- Leighton Sapir ([@iamleigh](https://github.com/iamleigh))

## [2.12.1](https://github.com/wpmudev/shared-ui/compare/v2.12.0...v2.12.1) (2021-12-15)

#### ✨ New Features
* **new(upload-files):** Enable drag and drop to upload files. [#370](https://github.com/wpmudev/shared-ui/pull/370) ([SUI-57](https://incsub.atlassian.net/browse/SUI-57)) ([@creador-dev](https://github.com/creador-dev))
* **new(checkbox):** Focus state styles. [#385](https://github.com/wpmudev/shared-ui/pull/385) ([SUI-67](https://incsub.atlassian.net/browse/SUI-67)) ([@creador-dev](https://github.com/creador-dev))
* **new(radio):** Focus state styles. [#385](https://github.com/wpmudev/shared-ui/pull/385) ([SUI-64](https://incsub.atlassian.net/browse/SUI-64)) ([@creador-dev](https://github.com/creador-dev))
* **new(modal):** Add option for disabling open/close modal effects. [#383](https://github.com/wpmudev/shared-ui/pull/383) ([SUI-112](https://incsub.atlassian.net/browse/SUI-112)) ([@creador-dev](https://github.com/creador-dev))

#### 🚀 Improvements
* **fix(upload-files):** Function must run only when a specific class or attribute is added. [#369](https://github.com/wpmudev/shared-ui/pull/369) ([SUI-242](https://incsub.atlassian.net/browse/SUI-242)) ([@creador-dev](https://github.com/creador-dev))
* **fix(select2):** Smart search needs focus state. [#390](https://github.com/wpmudev/shared-ui/pull/390) ([SUI-62](https://incsub.atlassian.net/browse/SUI-62)) ([@iamleigh](https://github.com/iamleigh))

#### 🐛 Bug Fixes
* **fix(modal):** Scroll bar triggers the closing action. [#372](https://github.com/wpmudev/shared-ui/pull/372) ([SUI-161](https://incsub.atlassian.net/browse/SUI-161)) ([@creador-dev](https://github.com/creador-dev))

#### 🏠 Internal
* **fix(gulp):** Not publishing to Github when release. [#391](https://github.com/wpmudev/shared-ui/pull/391) ([SUI-161](https://incsub.atlassian.net/browse/SUI-161)) ([@iamleigh](https://github.com/iamleigh))

#### Committers: 2
- Leighton Sapir ([@iamleigh](https://github.com/iamleigh))
- Pawan Kumar ([@creador-dev](https://github.com/creador-dev))

## [2.12.0](https://github.com/wpmudev/shared-ui/compare/v2.11.2...v2.12.0) (2021-12-03)

#### 💥 Breaking Changes
* **fix(gulp):** SASS deprecation warnings. [#376](https://github.com/wpmudev/shared-ui/pull/376) ([SUI-232](https://incsub.atlassian.net/browse/SUI-232)) ([@iamleigh](https://github.com/iamleigh))

#### 📝 Documentation
* **docs(changelog):** Set file new structure. [#377](https://github.com/wpmudev/shared-ui/pull/377) ([SUI-263](https://incsub.atlassian.net/browse/SUI-263)) ([@iamleigh](https://github.com/iamleigh))

#### Committers: 1
- Leighton Sapir ([@iamleigh](https://github.com/iamleigh))