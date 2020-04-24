import Vue from 'vue';
import App from './App.vue';

Vue.config.productionTip = false;

import 'bootstrap/dist/css/bootstrap.css';
import './assets/global.scss';

import VueGtag from "vue-gtag";

Vue.use(VueGtag, {
  config: { id: process.env.VUE_APP_GOOGLE_ANALYTICS_ID }
});

import VueGitHubButtons from 'vue-github-buttons';
import 'vue-github-buttons/dist/vue-github-buttons.css';
Vue.use(VueGitHubButtons);



new Vue({
  render: h => h(App)
}).$mount('#app');
