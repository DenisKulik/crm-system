import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import { getDatabase, ref, set } from 'firebase/database';

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
    async register({
      commit,
      dispatch,
    }, {
      email,
      password,
      name,
    }) {
      try {
        const user = await createUserWithEmailAndPassword(getAuth(), email, password);
        const uid = await dispatch('getUid');
        const database = getDatabase();
        await set(ref(database, `users/${uid}/info`), {
          bill: 10000,
          name,
        });
        commit('setUser', user);
      } catch (e) {
        console.log(e);
        throw e;
      }
    },
    getUid() {
      const user = getAuth().currentUser;
      return user ? user.uid : null;
    },
    async logout({ commit }) {
      await signOut(getAuth())
        .then(() => {
          commit('setUser', null);
        });
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
