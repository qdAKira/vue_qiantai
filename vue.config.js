const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  //用于解决运行时发生浏览器无法建立0.0.0.0:8080服务器连接
  lintOnSave: false,
  devServer:{
    open:true,
    host:'localhost',
    port:8080
  },
  //关闭eslint
  lintOnSave: false
})
