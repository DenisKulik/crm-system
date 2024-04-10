import { getDatabase, ref, push } from 'firebase/database';

export default {
  state: {},
  getters: {},
  mutations: {},
  actions: {
    async createCategory({ commit, dispatch }, {
      title,
      limit,
    }) {
      try {
        const uid = await dispatch('getUid');
        const db = getDatabase();
        const category = await push(ref(db, `users/${uid}/categories`), { title, limit });
        return { id: category.key, title, limit };
      } catch (e) {
        commit('setError', e);
        throw e;
      }
    },
  },
};
