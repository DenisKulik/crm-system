import Vue from 'vue';
// eslint-disable-next-line import/no-extraneous-dependencies
import Vuelidate from 'vuelidate';
// eslint-disable-next-line import/no-extraneous-dependencies
import { initializeApp } from 'firebase/app';
// eslint-disable-next-line import/no-extraneous-dependencies
import { getAuth, onAuthStateChanged } from 'firebase/auth';
// eslint-disable-next-line import/no-extraneous-dependencies
// import { getDatabase } from 'firebase/database';

import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import { dateFilter } from './filters';
import { messagePlugin } from './utils';

import 'materialize-css/dist/js/materialize.min';

Vue.config.productionTip = false;

Vue.use(Vuelidate);
Vue.use(messagePlugin);
Vue.filter('date', dateFilter);

// Initialize Firebase
const app = initializeApp({
  apiKey: 'AIzaSyCwaciuokJVe_cNklF9-r2pb-jrC5Kn9_c',
  authDomain: 'vue-2-crm-system.firebaseapp.com',
  projectId: 'vue-2-crm-system',
  storageBucket: 'vue-2-crm-system.appspot.com',
  messagingSenderId: '865728933250',
  appId: '1:865728933250:web:05c71a7a7abe21129cf39b',
  measurementId: 'G-1ZLLXC7XH9',
});

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
// const database = getDatabase(app);

onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log('Пользователь аутентифицирован:', user.uid);
  } else {
    console.log('Пользователь не аутентифицирован');
  }
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
