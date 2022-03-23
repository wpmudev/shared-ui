# Change Log

All notable changes to this project will be documented in this file. See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

## [2.12.7](https://github.com/wpmudev/shared-ui/compare/v2.12.6...v2.12.7) (Unreleased)

#### 🐛 Bug Fixes
* **fix(select):** The dropdown list is not changing colours when High Contrast Mode is enabled. [#474](https://github.com/wpmudev/shared-ui/pull/474) ([SUI-100](https://incsub.atlassian.net/browse/SUI-100)) ([@creador-dev](https://github.com/creador-dev))

#### 🏠 Internal
* **fix(showcase):** Add `alt` tags to all sample images. [#420](https://github.com/wpmudev/shared-ui/pull/420) ([SUI-2](https://incsub.atlassian.net/browse/SUI-2)) ([@creador-dev](https://github.com/creador-dev))
* **fix(showcase):** Add an accessibility state table or similar to keep track of SUI elements status. [#476](https://github.com/wpmudev/shared-ui/pull/476) ([SUI-34](https://incsub.atlassian.net/browse/SUI-34)) ([@iamleigh](https://github.com/iamleigh))

#### Committers: 2
- Leighton Sapir ([@iamleigh](https://github.com/iamleigh))
- Pawan Kumar ([@creador-dev](https://github.com/creador-dev))

## [2.12.6](https://github.com/wpmudev/shared-ui/compare/v2.12.5...v2.12.6) (2022-03-22)

#### 🐛 Bug Fixes
* **fix(toggles):** Slider element not aligning correctly when label or description or both are not present. [#482](https://github.com/wpmudev/shared-ui/pull/482) ([SUI-325](https://incsub.atlassian.net/browse/SUI-325)) ([@iamleigh](https://github.com/iamleigh))
* **fix(toggles):** Not registering the event in React with a mapped `onChange` event. [#484](https://github.com/wpmudev/shared-ui/pull/484) ([SUI-327](https://incsub.atlassian.net/browse/SUI-327)) ([@iamleigh](https://github.com/iamleigh))

#### Committers: 1
- Leighton Sapir ([@iamleigh](https://github.com/iamleigh))

## [2.12.5](https://github.com/wpmudev/shared-ui/compare/v2.12.4...v2.12.5) (2022-03-19)

#### 🚀 Improvements
* **fix(tabs):** Enable radio inputs for side-tab buttons. [#481](https://github.com/wpmudev/shared-ui/pull/481) ([SUI-7](https://incsub.atlassian.net/browse/SUI-7)) ([@iamleigh](https://github.com/iamleigh))

#### 🐛 Bug Fixes
* **fix(toggles):** Clickable area is too long. [#457](https://github.com/wpmudev/shared-ui/pull/457) ([SUI-180](https://incsub.atlassian.net/browse/SUI-180)) ([@creador-dev](https://github.com/creador-dev))
* **fix(tabs):** Overflow flushed tabs menu doesn't have enough space to place navigation buttons. [#441](https://github.com/wpmudev/shared-ui/pull/441) ([SUI-282](https://incsub.atlassian.net/browse/SUI-282)) ([@creador-dev](https://github.com/creador-dev))
* **fix(insert-variables):** Dropdown shouldn't store the option selected. [#468](https://github.com/wpmudev/shared-ui/pull/468) ([SUI-294](https://incsub.atlassian.net/browse/SUI-294)) ([@creador-dev](https://github.com/creador-dev))
* **fix(checkbox):** Clickable area is too long. [#472](https://github.com/wpmudev/shared-ui/pull/472) ([SUI-300](https://incsub.atlassian.net/browse/SUI-300)) ([@creador-dev](https://github.com/creador-dev))

#### Committers: 2
- Leighton Sapir ([@iamleigh](https://github.com/iamleigh))
- Pawan Kumar ([@creador-dev](https://github.com/creador-dev))

## [2.12.4](https://github.com/wpmudev/shared-ui/compare/v2.12.3...v2.12.4) (2022-03-03)

#### 🚀 Improvements
* **fix(select):** Use arrow function instead of anonymous function. [#470](https://github.com/wpmudev/shared-ui/pull/470) ([SUI-318](https://incsub.atlassian.net/browse/SUI-318)) ([@iamleigh](https://github.com/iamleigh))

#### 🐛 Bug Fixes
* **fix(uploads):** Hoisting of functions declared in blocks is handled differently in different browsers. [#458](https://github.com/wpmudev/shared-ui/pull/458) ([SUI-302](https://incsub.atlassian.net/browse/SUI-302)) ([@creador-dev](https://github.com/creador-dev))
* **fix(tabs):** Function `init` has no return statements. [#464](https://github.com/wpmudev/shared-ui/pull/464) ([SUI-310](https://incsub.atlassian.net/browse/SUI-310)) ([@iamleigh](https://github.com/iamleigh))
* **fix(multistrings):** Undefined is not a possible return value of `typeof`. [#465](https://github.com/wpmudev/shared-ui/pull/465) ([SUI-309](https://incsub.atlassian.net/browse/SUI-309)) ([@iamleigh](https://github.com/iamleigh))
* **fix(tabs):** Function `setCallback` takes 0 parameter(s). [#466](https://github.com/wpmudev/shared-ui/pull/466) ([SUI-312](https://incsub.atlassian.net/browse/SUI-312)) ([@iamleigh](https://github.com/iamleigh))
* **fix(tabs):** On `keyDownEventListener` the body of `case` clause duplicates. [#467](https://github.com/wpmudev/shared-ui/pull/467) ([SUI-313](https://incsub.atlassian.net/browse/SUI-313)) ([@iamleigh](https://github.com/iamleigh))
* **fix(modals):** If statement have duplicate bodies. [#469](https://github.com/wpmudev/shared-ui/pull/469) ([SUI-311](https://incsub.atlassian.net/browse/SUI-311)) ([@iamleigh](https://github.com/iamleigh))

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