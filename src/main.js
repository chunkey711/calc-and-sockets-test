import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Toaster from 'v-toaster'

Vue.config.productionTip = false

Vue.use(Toaster)
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
