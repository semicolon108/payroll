import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import apolloProvider from "@/services/apollo-client";
import axios from 'axios'
import {baseURL} from "@/config/variables";
import moment from 'moment-timezone'
import './plugins/index'
// import LoadingScreen from '@/components/Loading/loading-screen'
import dialog from '@/components/Confirm'

Vue.use(dialog)
import {readableBytes} from '@/utils/read-file'

var VueScrollTo = require('vue-scrollto');

Vue.use(VueScrollTo)
 
// Vue.component('LoadingScreen', LoadingScreen)


Vue.filter('moment', (date, format) => moment(date).tz('Asia/Bangkok').format(format ? format : 'LL'))
Vue.filter('currency', (num) => new Intl.NumberFormat().format(num))
Vue.filter('fileSize', (num) => readableBytes(num))



//import Pagination from '@/utils/ant-design-vue/es';


// Vue.use(Pagination);

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
})
.$mount('#app')




