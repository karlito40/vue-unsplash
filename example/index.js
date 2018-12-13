import Vue from 'vue'
import App from './App.vue'
import Unsplash from '../src'
import { ACCESS_KEY } from './config'
import axios from 'axios';

Vue.config.productionTip = false;

Vue.use(Unsplash, {
  accessKey: ACCESS_KEY,
  httpClient: axios
});

new Vue({
  render: h => h(App),
}).$mount('#app')