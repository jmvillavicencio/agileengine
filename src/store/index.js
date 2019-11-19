import Vue from 'vue';
import Vuex from 'vuex';
import user from './modules/user';

Vue.use(Vuex);

const initialState = {
  loadingApp: false,
};

const getters = {
  loadingApp: ({ loadingApp }) => loadingApp,
};

const actions = {
  startLoadingApp({ commit }) {
    commit('setLoading', true);
  },
  endLoadingApp({ commit }) {
    commit('setLoading', false);
  },
};

const mutations = {
  setLoading(state, payload) {
    Vue.set(state, 'loadingApp', payload);
  },
};

export default function createStore() {
  const store = new Vuex.Store({
    state() { return { ...initialState }; },
    mutations,
    actions,
    getters,
    modules: {
      user,
    },
  });

  return store;
}
