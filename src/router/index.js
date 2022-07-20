//配置路由的地方
//引入vue
import Vue from 'vue';
import VueRouter from 'vue-router'

// 引入store
import store from '@/store'
//使用插件
Vue.use(VueRouter)

//引入路由组件
import Home from '@/pages/Home'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Search from '@/pages/Search'
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'
import Trade from '@/pages/Trade'

//先把VueRouter原型对象的push，保存一份
let originPush = VueRouter.prototype.push;

//先把VueRouter原型对象的push，保存一份
let originReplace = VueRouter.prototype.replace;

//重写push
//第一个参数：告诉原来的push，跳转的目标位置和传递了哪些参数
VueRouter.prototype.push = function (location,resolve,reject) {
  if(resolve && reject){
    //call和apply区别
    //相同点：都可以调用函数一次，都可以篡改函数的上下文一次
    //不同点：call于apply传递参数不同，call传递参数用逗号隔开，apply方法执行，传递数组
    originPush.call(this,location,resolve,reject)
  }else{
    originPush.call(this,location,()=>{},()=>{})
  }
}

//重写replace
VueRouter.prototype.replace = function (location,resolve,reject) {
  if(resolve && reject){
    //call和apply区别
    //相同点：都可以调用函数一次，都可以篡改函数的上下文一次
    //不同点：call于apply传递参数不同，call传递参数用逗号隔开，apply方法执行，传递数组
    originReplace.call(this,location,resolve,reject)
  }else{
    originReplace.call(this,location,()=>{},()=>{})
  }
}

//配置路由
let router =  new VueRouter({
  //配置路由
  routes:[
    {
      path:'/trade',
      name:'Trade',
      component:Trade,
      meta:{show:true}
    },
    {
      path:'/shopCart',
      name:'ShopCart',
      component:ShopCart,
      meta:{show:true}
    },
    {
      path:'/addCartSuccess',
      name:'AddCartSuccess',
      component:AddCartSuccess,
      meta:{show:true}
    },
    {
      // 点击图片，跳转获取详细信息，需要传递params参数，获取所点击图片的id
      path:'/detail/:skuid?',
      component:Detail,
      meta:{show:true}
    },
    {
      path:'/home',
      component:Home,
      meta:{show:true}
    },
    {
      path:'/login',
      component:Login,
      meta:{show:false}
    },
    {
      path:'/register',
      component:Register,
      meta:{show:false}
    },
    {
      name:'search',
      path:'/search/:keyword?',
      component:Search,
      meta:{show:true}
    },
    //重定向,在项目跑起来的时候，访问/，立马转到home页面
    {
      path:'*',
      redirect:'/home'
    }
  ],
  // 设置路由跳转，滚轮位置
  scrollBehavior (to, from, savedPosition) {
    // return 期望滚动到哪个的位置,返回的y=0，代表这个滚动条在最上方
    return {y:0}
  }
})

//全局守卫：前置守卫（在路由跳转之前进行判断）
router.beforeEach(async (to,from,next)=>{
  //to:可以获取到你要跳转到那个路由信息
  // from:可以获取到你从哪个路由而来的信息
  // next:放行函数  next()放行
  // next('/login') 放行到指定
  // 方便测试，统一放行
  // next();
  // 获取仓库中token
  let token = store.state.user.token
  // 携带token问服务器要到用户信息，存储其中的name
  let name = store.state.user.userInfo.name;
  // 用户登录了
  if(token){
    // 已经登录了，不能在进入登录和注册页面
    if(to.path=="/login"||to.path=="/register"){
      next('/home')
    }else{
      // 已经登录了，访问非登录与注册，前提需要token信息
      // 登录了且有用户信息
      if(name){
        next()
      }else{
        // 登录了，没有用户信息(这种情况是由于之前只在home页面派发getUserInfo，获取用户信息)
        // 在路由跳转之前获取信息
        try {
          await store.dispatch('getUserInfo')
          next();
        } catch (error) {
          // token失效，重新登录
          store.dispatch('userLogout')
          next('/login')
        }
      }
      
    }
  }else{
    // 用户未登录
    next();
  }
})

export default router