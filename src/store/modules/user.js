import Vue from 'vue';
import Vuex from 'vuex';

import Api from '../../api';

Vue.use(Vuex);

const initialState = {
  user: {
    balance: 0,
    email: null,
    id: null,
  },
};

const actions = {
  async initialize({ commit }) {
    const userId = localStorage.getItem('userId');
    if (userId) {
      const { user } = await Api.user.getById(userId);
      commit('setUser', user);
    }
  },
  async login({ commit }, payload) {
    const { user } = await Api.user.login(payload);
    localStorage.setItem('userId', user.id);
    commit('setUser', user);
  },
  async sendTransaction({ commit, getters }, payload) {
    const { balance } = await Api.user.sendTransaction(getters.userId, payload);
    commit('setBalance', balance);
  },
};

const mutations = {
  setUser(state, payload) {
    Vue.set(state, 'user', payload);
  },
  setBalance(state, payload) {
    Vue.set(state, 'user', {
      ...state.user,
      balance: payload,
    });
  },
};

const getters = {
  userEmail: ({ user }) => user.email,
  userId: ({ user }) => user.id,
  userBalance: ({ user }) => user.balance,
};
export default {
  namespaced: true,
  state() { return { ...initialState }; },
  mutations,
  actions,
  getters,
};