import { moduleFactory } from './module';
import FlagsmithFeature from './FlagsmithFeature.vue';

const install = (Vue, { environmentId, store, host }) => {
  const defaultHost = 'https://api.flagsmith.com';
  if (!store) {
    throw new Error('Please initialize plugin with a Vuex store.');
  }

  Vue.config.applicationHostname = 'localhost';
  store.registerModule('flagsmith', moduleFactory({ environmentId, host: host || defaultHost }));
  Vue.component('flagsmith-feature', FlagsmithFeature);
  store.dispatch('flagsmith/fetch');
};

const plugin = {
  FlagsmithFeature,
  install
};

export default plugin;

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(plugin);
}
