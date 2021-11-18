import axios from 'axios';
import Vue from 'vue';

const moduleFactory = ({ host, environmentId }) => ({
  actions: {
    async fetch({ commit }) {
      commit('setLoading', true);

      try {
        const { data } = await axios.get(`${host}/api/v1/flags`, {
          headers: {
            'X-Environment-Key': environmentId
          }
        });

        commit('setFeatureFlags', data);
      } catch (e) {
        // istanbul ignore next
        console.error('Unable to reach Flagsmith API');
      } finally {
        commit('setLoading', false);
      }
    }
  },

  mutations: {
    setFeatureFlags(state, featureFlags) {
      const normalizedFeatureFlags = featureFlags.reduce((result, featureFlag) => {
        result[featureFlag.feature.name] = featureFlag.enabled;
        return result;
      }, {});

      Vue.set(state, 'featureFlags', Object.assign({}, normalizedFeatureFlags));
    },
    setLoading(state, loading) {
      state.loading = loading;
    }
  },

  namespaced: true,

  state: {
    featureFlags: {},
    loading: true
  }
});

export { moduleFactory };
