import Vue from 'vue';
import Vuelidate from 'vuelidate';
import Paginate from 'vuejs-paginate';
import VueMeta from 'vue-meta';
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

import AppLoader from '@/components/app/AppLoader.vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import { dateFilter, currencyFilter, localizeFilter } from './filters';
import { messagePlugin } from './utils';
import { tooltipDirective } from './directives';

import 'materialize-css/dist/js/materialize.min';

Vue.config.productionTip = false;

Vue.use(Vuelidate);
Vue.use(messagePlugin);
Vue.use(VueMeta, { refreshOnceOnNavigation: true });
Vue.filter('date', dateFilter);
Vue.filter('currency', currencyFilter);
Vue.filter('localize', localizeFilter);
Vue.directive('tooltip', tooltipDirective);
Vue.component('AppLoader', AppLoader);
Vue.component('AppPaginate', Paginate);

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
// Initialize Realtime Database and get a reference to the service
getDatabase(app);

onAuthStateChanged(auth, () => {
  new Vue({
    router,
    store,
    render: (h) => h(App),
  }).$mount('#app');
});
