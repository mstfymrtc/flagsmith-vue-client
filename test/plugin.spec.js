import { createLocalVue, mount } from '@vue/test-utils';
import Vuex from 'vuex';
import Vue from 'vue';
import VueFlagsmith from '../src';
import axios from 'axios';

const environmentId = 'vue-flagsmith-1';
const component = {
  template: '<flagsmith-feature name="banner-visible">hello</flagsmith-feature>'
};
const host = 'https://fake-host.io';

let localVue;
let store;
let wrapper;

const disabledFixture = [
  {
    feature: {
      name: 'banner-visible'
    },
    enabled: false,
    feature_segment: null
  }
];

const enabledFixture = [
  {
    feature: {
      name: 'banner-visible'
    },
    enabled: true,
    feature_segment: null
  }
];

jest.mock('axios');

let axiosGetMock;

describe('module.js', () => {
  beforeEach(() => {
    axiosGetMock = axios.get.mockImplementationOnce(() =>
      Promise.resolve({ data: disabledFixture })
    );
    localVue = createLocalVue();
    localVue.use(Vuex);
    store = new Vuex.Store();
    localVue.use(VueFlagsmith, { host, environmentId, store });

    wrapper = mount(component, { localVue, store });
  });

  it('should fetch', done => {
    setTimeout(() => {
      expect(store.state.flagsmith.featureFlags).toEqual({
        'banner-visible': disabledFixture[0].enabled
      });
      expect(axiosGetMock.mock.calls[0][0]).toBe(`${host}/api/v1/flags`);
      done();
    }, 500);
  });

  it('should enable and disable', async () => {
    expect(wrapper.text()).toBeFalsy();

    store.commit('flagsmith/setFeatureFlags', enabledFixture);

    await Vue.nextTick();
    expect(wrapper.text()).toBe('hello');
  });
});
