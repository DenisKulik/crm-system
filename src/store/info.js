import {
  getDatabase, ref, onValue, update, child,
} from 'firebase/database';

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
        const db = getDatabase();
        const uid = await dispatch('getUid');
        const info = await ref(db, `users/${uid}/info`);
        return new Promise((resolve) => {
          onValue(info, (snapshot) => {
            const data = snapshot.val();
            if (data) {
              commit('setInfo', data);
              resolve(data);
            }
          });
        });
      } catch (e) {
        commit('setError', e);
        throw e;
      }
    },

    async updateInfo(
      {
        commit,
        dispatch,
        state,
      },
      toUpdate,
    ) {
      try {
        const db = getDatabase();
        const uid = await dispatch('getUid');
        const updateData = { ...state.info, ...toUpdate };
        await update(child(ref(db), `users/${uid}/info`), updateData);
        commit('setInfo', updateData);
      } catch (e) {
        commit('setError', e);
        throw e;
      }
    },
  },
};
