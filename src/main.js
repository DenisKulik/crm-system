import Vue from 'vue';
// eslint-disable-next-line import/no-extraneous-dependencies
import Vuelidate from '@vuelidate/core';

import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import { dateFilter } from './filters';

import 'materialize-css/dist/js/materialize.min';

Vue.config.productionTip = false;

Vue.use(Vuelidate);
Vue.filter('date', dateFilter);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
