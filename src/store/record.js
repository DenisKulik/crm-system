import {
  getDatabase, ref, push,
} from 'firebase/database';

export default {
  state: {},
  getters: {},
  mutations: {},
  actions: {
    async createRecord(
      {
        commit,
        dispatch,
      },
      record,
    ) {
      try {
        console.log(record);
        const db = getDatabase();
        const uid = await dispatch('getUid');
        return await push(ref(db, `users/${uid}/records`), record);
      } catch (e) {
        commit('setError', e);
        throw e;
      }
    },
  },
};
