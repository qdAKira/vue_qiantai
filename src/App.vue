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
  components: {Header,Footer},
  mounted() {
    //通知vuex发送请求，获取数据，存储到仓库
    //派发一个action||获取商品分类的三级列表的数据
    this.$store.dispatch("categoryList");
  },
}
</script>

<style>

</style>
