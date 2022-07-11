//引入vue
import Vue from 'vue'
//引入vuex
import Vuex from 'vuex'
//使用vuex插件
Vue.use(Vuex)

//引入对应模块
import home from './home'
import search from './search'
import detail from './detail'

//创建并暴露store(vuex模块化)
export default new Vuex.Store({
  modules:{
    home,
    search,
    detail
  }
})