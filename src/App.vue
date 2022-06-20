<template>
  <div>
    <Header/>
    <!-- 路由组件出口的地方 -->
    <router-view></router-view>
    <!-- 在home，search时显示，在登录和注册页面隐藏 (利用meta，路由属性一般由$route进行调用)-->
    <Footer v-show="$route.meta.show"/>
  </div>
</template>

<script>
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
export default {
  name: 'App',
  components: {Header,Footer}
}
</script>

<style>

</style>
