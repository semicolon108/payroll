import Vue from 'vue'
import Vuex from 'vuex'
import auth from "@/store/modules/auth";
import loading from '@/store/modules/loading'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    auth,
    loading
  }
})
