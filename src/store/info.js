import { getDatabase, ref, onValue } from 'firebase/database';

export default {
  state: {
    info: {},
  },
  getters: {
    info: (state) => state.info,
  },
  mutations: {
    setInfo(state, info) {
      state.info = info;
    },
    clearInfo(state) {
      state.info = {};
    },
  },
  actions: {
    async fetchInfo({
      commit,
      dispatch,
    }) {
      try {
        await dispatch('getUid');
        const db = getDatabase();
        const uid = await dispatch('getUid');
        const info = await ref(db, `users/${uid}/info`);
        onValue(info, (snapshot) => {
          const data = snapshot.val();
          console.log(data);
          if (data) commit('setInfo', data);
        });
      } catch (e) {
        commit('setError', e);
        throw e;
      }
    },
  },
};
