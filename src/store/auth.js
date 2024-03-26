import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

export default {
  actions: {
    async login({
      commit,
    }, {
      email,
      password,
    }) {
      try {
        const user = await signInWithEmailAndPassword(getAuth(), email, password);
        commit('setUser', user);
      } catch (e) {
        console.log(e);
        throw e;
      }
    },
    logout({ commit }) {
      commit('setUser', null);
    },
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
  },
  state: {
    user: null,
  },
};
