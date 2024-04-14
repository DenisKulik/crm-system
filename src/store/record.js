import {
  getDatabase, ref, push, onValue, child,
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
        const db = getDatabase();
        const uid = await dispatch('getUid');
        return await push(ref(db, `users/${uid}/records`), record);
      } catch (e) {
        commit('setError', e);
        throw e;
      }
    },

    fetchRecords({
      commit,
      dispatch,
    }) {
      return new Promise((resolve, reject) => {
        (async () => {
          try {
            const db = getDatabase();
            const uid = await dispatch('getUid');
            const records = ref(db, `users/${uid}/records`);
            onValue(records, (snapshot) => {
              const data = snapshot.val();
              if (!data) {
                resolve([]);
                return;
              }
              const recordsArray = Object.keys(data)
                .map((key) => ({
                  ...data[key],
                  id: key,
                }));
              resolve(recordsArray);
            });
          } catch (e) {
            commit('setError', e);
            reject(e);
          }
        })();
      });
    },
    fetchRecordById({
      commit,
      dispatch,
    }, id) {
      return new Promise((resolve, reject) => {
        (async () => {
          try {
            const db = getDatabase();
            const uid = await dispatch('getUid');
            const record = child(ref(db, `users/${uid}/records`), id);
            onValue(record, (snapshot) => {
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
