import Vue from 'vue';
import Vuex from 'vuex';
import auth from './auth';
import info from './info';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    error: null,
  },
  getters: {
    user: (state) => state.user,
    error: (state) => state.error,
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setError(state, error) {
      state.error = error;
    },
    clearError(state) {
      state.error = null;
    },
  },
  actions: {
    async fetchCurrency() {
      const key = process.env.VUE_APP_API_KEY;
      const res = await fetch(`https://api.currencyapi.com/v3/latest?apikey=${key}&currencies=EUR%2CUSD%2CRUB&base_currency=RUB`);
      const data = await res.json();
      return data.data;
    },
  },
  modules: {
    auth,
    info,
  },
});
