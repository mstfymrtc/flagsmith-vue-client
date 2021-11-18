# Flagsmith Vue Client

![Build](https://github.com/crishellco/vue-unleash/workflows/Build/badge.svg)
[![codecov](https://codecov.io/gh/crishellco/vue-unleash/branch/master/graph/badge.svg?token=KSe1Aim7Mx)](https://codecov.io/gh/crishellco/vue-unleash)
[![Maintainability](https://api.codeclimate.com/v1/badges/2a6e74587ac474c5f0d5/maintainability)](https://codeclimate.com/github/crishellco/vue-unleash/maintainability)

A Vue client for [Flagsmith](https://flagsmith.com/).

> Inspired from [crishellco](https://github.com/crishellco)'s [vue-unleash](https://github.com/crishellco/vue-unleash).

Flagsmith Vue Client provides an integration for Vue and the Flagsmith open-source feature flag platform.

_This plugin requires that your project use Vuex._

## Install

```bash
yarn add -D flagsmith-vue-client
# or
npm i -D flagsmith-vue-client
```

```javascript
import Vue from 'vue';
import VueFlagsmith from 'flagsmith-vue-client';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({});

/**
 * The <flagsmith-feature /> component is registered
 * globally during installation.
 */
Vue.use(VueFlagsmith, {
  // Required, environment id
  environmentId: 'my-vue-app-1',

  // Optional, Unleash instance host (defaults to https://api.flagsmith.com)
  host: 'https://api.flagsmith.com',

  // Required
  store
});
```

## Component Usage

```javascript
<template>
  <flagsmith-feature name="BannerVisible">
    <add-user-form />
  </flagsmith-feature>
</template>
```

## Store Usage

```javascript
export default {
  mounted() {
    // Get all feature flags
    console.log(this.$store.state.flagsmith.featureFlags);

    // Get weather initial loading is occurring
    console.log(this.$store.state.flagsmith.loading);

    // Re-fetch data
    this.$store.dispatch('flagsmith/fetch');
  }
};
```

## Scripts

```bash
yarn lint
```

```bash
yarn test
```

```bash
yarn build
```

## How to Contribute

### Pull Requests

1. Fork the repository
2. Create a new branch for each feature or improvement
3. Send a pull request from each feature branch to the **develop** branch

## License

[MIT](http://opensource.org/licenses/MIT)
