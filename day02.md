1:编程式路由由跳转到当前路由（参数不变），多次执行会抛出NavigationDuplicated的警告错误？
  路由跳转有两种形式：声明式导航、编程式导航
  声明式导航无此问题，因为vue-router底层已经处理好了
1.1为什么编程式导航进行路由跳转的时候，会有这种警告错误？
  "vue-router": "^3.5.4" 最新的vue-router已经引入promise

1.2通过给push方法传递相应的成功、失败的回调函数，可以捕获到当前错误，可以解决

1.3通过底部的代码，可以实现解决错误
this.$router.push({ name:'search',params:{keyword:this.keyword},query:{k:this.keyword.toUpperCase()}},()=>{},()=>{})
后面两项分别代表执行成功和失败的回调函数。这种写法治标不治本，将来在别的组件中push|replace,编程式导航还是会有类似错误

1.4
this:当前组件实例（search）
this.$router属性：当前的这个属性，属性值VueRouter类的一个实例，当在入口文件注册路由的时候，给组件实例添加$router|$route属性
push：VueRouter类的一个实例


2.Home模块组件拆分
  1.先把静态页面完成
  2.拆分静态组件
  3.获取服务器的数据进行展示
  4.js动态业务

3.三级联动组件完成
    由于三级联动，在Home、Search、Detail，把三级联动注册为全局组件
    好处：只需要注册一次，就可以在项目任意地方使用
  3.1全局组件的使用
    1.创建
    2.注册（一般在main.js文件中，先import引入，然后Vue.component使用
    例如：
      //第一个参数：全局组件的名字，第二个参数：哪一个组件
      Vue.component(TypeNav.name,TypeNav)）

     3.使用，（不需要引入，直接使用） 

4：完成其余静态组件
  HTML + css + 图片资源 ---【结构、样式、图片资源】

5.postman接口测试

6:axios二次封装
  XMLHttpRequest ,fetch,JQ,axios
  6.1 为什么需要进行二次封装axios？
  请求拦截器、响应拦截器
  请求拦截器：可以在发请求之前处理一些业务
  响应拦截器：当服务器数据返回以后，可以处理一些事情

  使用前安装axios (npm i --save axios)

  6.2在项目中经常API【axios】
  接口中：路径都带有/api
  baseURL:'/api'

  6.3可去git|npm查看关于axios文档


7.接口统一管理

  项目很小：完全可以在组件的生命周期函数中发请求

  项目大：axios.get('xxxx')

  7.1跨域问题
  什么是跨域：协议，域名，端口号不同请求，称为跨域
  http://locationhost:8080/#/home ---前端项目本地服务器
  http://39.98.123.211  ----后台服务器

  解决跨域
  JSONP、CROS、代理（配置代理服务器）

8.nprogress 进度条的使用
  安装npm i --save nprogress
  使用时要引入nprogress以及它的样式（一般放在拦截器中）

  start:进度条开始(请求)
  done：进度条结束（响应）
  进度条颜色可以修改的，需要修改样式

9.vuex状态管理库
  9.1vuex是什么？
  vuex是官方提供一个插件，状态管理库，集中式管理项目中组件共用的数据
  注意：不是所有的项目都需要vuex，如果项目很小，完全不需要vuex，项目较大，组件很多，数据很多，数据维护费劲，vuex

  state
  actions
  mutations
  getters

 9.2 使用
  引入时vue2中只能使用vuex3(npm i vuex@3)
  vue3中使用vuex4
  ### 3.搭建vuex环境

  1. 创建文件：```src/store/index.js```

    ```js
    //引入Vue核心库
    import Vue from 'vue'
    //引入Vuex
    import Vuex from 'vuex'
    //应用Vuex插件
    Vue.use(Vuex)
    
    //准备actions对象——响应组件中用户的动作
    const actions = {}
    //准备mutations对象——修改state中的数据
    const mutations = {}
    //准备state对象——保存具体的数据
    const state = {}
    
    //创建并暴露store
    export default new Vuex.Store({
      actions,
      mutations,
      state
    })
    ```

  2. 在```main.js```中创建vm时传入```store```配置项

    ```js
    ......
    //引入store
    import store from './store'
    ......
    
    //创建vm
    new Vue({
      el:'#app',
      render: h => h(App),
      store
    })
    ```