
// #ifndef VUE3
import Vue from 'vue'
import App from './App'
// 按需导入 $http 对象
import { $http } from '@escook/request-miniprogram'
// 导入store的示例
import store from './store/store.js'
// 设置请求根路径
$http.baseUrl = 'https://api-hmugo-web.itheima.net'
// 挂载到顶级对象uni
uni.$http = $http

// 请求开始之前做一些事情
$http.beforeRequest = function (options) {
  uni.showLoading({
    title: '数据加载中...',
  })
}

// 请求完成之后做一些事情
$http.afterRequest = function () {
  uni.hideLoading()
}

// 封装请求失败的提示方法
uni.$showMsg = function (errorMsg, duration) {
  uni.showToast({
    title: errorMsg,
    duration: duration,
    icon: 'none'
  })
}
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App,
    // 将store挂载到Vue实例上
    store
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import App from './App.vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif