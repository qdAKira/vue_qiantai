import Vue from 'vue'
import App from './App.vue'
//引入路由
import router from '@/router'
//引入store
import store from '@/store'

//引入mockserver.js(模拟数据)
import '@/mock/mockServer'

// 引入swiper样式
import 'swiper/css/swiper.css'

//引入阿里图标css
import '@/assets/icon/iconfont.css'


//三级联动组件----全局组件
import TypeNav from '@/components/TypeNav'

//轮播图---注册为全局组件
import Carousel from '@/components/Carousel'

//分页器---注册为全局组件
import Pagination from '@/components/Pagination'

//第一个参数：全局组件的名字，第二个参数：哪一个组件
Vue.component(TypeNav.name,TypeNav)
Vue.component(Carousel.name,Carousel)
Vue.component(Pagination.name,Pagination)

//测试
import {reqCategoryList} from '@/api'
reqCategoryList()

// 测试搜索模块数据，发送过来的格式
// import { reqSearchInfo } from "@/api";
// console.log(reqSearchInfo({}));

Vue.config.productionTip = false

// 统一接口api文件夹里面全部请求函数
// 统一引入
import * as API from '@/api'

new Vue({
  render: h => h(App),
   //开启全局事件总线
   beforeCreate() {
    Vue.prototype.$bus = this,
    Vue.prototype.$API = API
  },
  //注册路由，底下写法key-v一致，省略v[router需要小写]
  router,
  store
}).$mount('#app')
