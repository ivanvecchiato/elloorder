import Vue from 'vue'
import App from './App.vue'
import router from './router'
import i18n from "./i18n"

//import '@inkline/inkline/dist/inkline.css';
//import Inkline from '@inkline/inkline';
import "@/assets/global.css"
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import './registerServiceWorker'

// Install BootstrapVue
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

//Vue.use(Inkline);

new Vue({
  router,
  i18n,
  render: h => h(App)
}).$mount('#app')
