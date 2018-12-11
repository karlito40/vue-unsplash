import Vue from 'vue'
import App from './App.vue'
import Unsplash from './unsplash'

Vue.config.productionTip = false


Vue.use(Unsplash, {
  accessKey: '11150a568db7d05559ee691ce78e75cfa4dcf8368e56de8a836430966f453508'
});

new Vue({
  render: h => h(App),
}).$mount('#app')
