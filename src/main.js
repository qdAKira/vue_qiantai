import Vue from 'vue'
import App from './App.vue'
//引入路由
import router from '@/router'
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  //注册路由，底下写法key-v一致，省略v[router需要小写]
  router
}).$mount('#app')
