import Vue from 'vue';
import Vuex from 'vuex';
import { DEBIT_TRANSACTION } from '../../constants';
import Api from '../../api';

Vue.use(Vuex);

const initialState = {
  user: {
    balance: 0,
    email: null,
    id: null,
    transactions: [],
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
    const { user } = await Api.user.authenticate(payload);
    localStorage.setItem('userId', user.id);
    commit('setUser', user);
  },
  async sendTransaction({ commit, getters }, payload) {
    const { balance } = await Api.user.sendTransaction(getters.userId, payload);
    const absoluteAmount = Math.abs(payload.amount);
    commit('addTransaction', {
      ...payload,
      amount: payload.type === DEBIT_TRANSACTION ? (absoluteAmount * -1) : absoluteAmount,
    });
    commit('setBalance', balance);
  },
};

const mutations = {
  setUser(state, payload) {
    Vue.set(state, 'user', {
      balance: payload.currentBalance,
      email: payload.email,
      id: payload.id,
      transactions: payload.transactions,
    });
  },
  setBalance(state, payload) {
    Vue.set(state, 'user', {
      ...state.user,
      balance: payload,
    });
  },
  addTransaction(state, payload) {
    Vue.set(state, 'user', {
      ...state.user,
      transactions: [payload, ...state.user.transactions],
    });
  },
};

const getters = {
  userEmail: ({ user }) => user.email,
  userId: ({ user }) => user.id,
  userBalance: ({ user }) => user.balance,
  userTransactions: ({ user }) => user.transactions,
};
export default {
  namespaced: true,
  state() { return { ...initialState }; },
  mutations,
  actions,
  getters,
};
