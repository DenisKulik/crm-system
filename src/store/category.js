import {
  getDatabase, ref, push, onValue, update, child,
} from 'firebase/database';

export default {
  state: {},
  getters: {},
  mutations: {},
  actions: {
    async createCategory({
      commit,
      dispatch,
    }, {
      title,
      limit,
    }) {
      try {
        const db = getDatabase();
        const uid = await dispatch('getUid');
        const category = await push(ref(db, `users/${uid}/categories`), {
          title,
          limit,
        });
        return {
          id: category.key,
          title,
          limit,
        };
      } catch (e) {
        commit('setError', e);
        throw e;
      }
    },
    async updateCategory({
      commit,
      dispatch,
    }, {
      id,
      title,
      limit,
    }) {
      try {
        const db = getDatabase();
        const uid = await dispatch('getUid');
        await update(child(ref(db), `users/${uid}/categories/${id}`), {
          title,
          limit,
        });
      } catch (e) {
        commit('setError', e);
        throw e;
      }
    },
    fetchCategories({
      commit,
      dispatch,
    }) {
      return new Promise((resolve, reject) => {
        (async () => {
          try {
            const db = getDatabase();
            const uid = await dispatch('getUid');
            const categories = ref(db, `users/${uid}/categories`);
            onValue(categories, (snapshot) => {
              const data = snapshot.val();
              if (!data) {
                resolve([]);
                return;
              }
              const categoriesArray = Object.keys(data)
                .map((key) => ({
                  ...data[key],
                  id: key,
                }));
              resolve(categoriesArray);
            });
          } catch (e) {
            commit('setError', e);
            reject(e);
          }
        })();
      });
    },
    fetchCategoryById(
      {
        commit,
        dispatch,
      },
      id,
    ) {
      return new Promise((resolve, reject) => {
        (async () => {
          try {
            const db = getDatabase();
            const uid = await dispatch('getUid');
            const category = child(ref(db, `users/${uid}/categories`), id);
            onValue(category, (snapshot) => {
              const data = snapshot.val();
              if (!data) {
                resolve({});
                return;
              }
              resolve({
                ...data,
                id,
              });
            });
          } catch (e) {
            commit('setError', e);
            reject(e);
          }
        })();
      });
    },
  },
};
