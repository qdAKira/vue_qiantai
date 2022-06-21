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