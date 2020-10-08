import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import apolloProvider from "@/services/apollo-client";
import axios from 'axios'
import {baseURL} from "@/config/variables";
import moment from 'moment-timezone'

import './plugins/index'


Vue.filter('moment', (date) => moment(date).tz('Asia/Bangkok').format('LL'))

Vue.filter('currency', (num) => new Intl.NumberFormat().format(num) + ' LAK')

Vue.prototype.$baseUrl = baseURL
axios.defaults.baseURL = baseURL + '/client-api/'
Vue.prototype.$axios = axios
Vue.prototype.$api = baseURL + '/client-api/'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  apolloProvider,
  render: h => h(App)
}).$mount('#app')
