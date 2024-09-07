import Vue from 'vue'
import Vuex from 'vuex'
import Cart from './cart.js'
import User from './user.js'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    Cart,
    User
  }
})

export default store
