1：vue-cli脚手架初始化项目
node + webpack + 淘宝镜像

node_modules文件夹：项目依赖文件夹

public文件夹：一般放置静态资源（图片），注意，放置在public文件夹中静态资源，webpack进行打包的时候会原封不动打包到dist文件夹中

src文件夹（程序员代码文件夹）:

  assets： 存放公用的静态资源,注意，放置在assets文件夹里面静态资源，在webpack打包时，webpack会把静态资源当做一个模板，打包JS文件里

  components： 非路由组件（全局组件），其他组件放在views或者pages文件夹中

  App.vue： 唯一的跟组件，vue当中的组件（.vue）

  main.js： 程序入口文件，最先执行的文件

babel.config.js: 配置文件（babel相关）

package.json: 项目的详细信息记录

package-lock.json: 缓存性文件（各种包的来源）

README.md:说明性文件

2.项目的其他配置

2.1项目运行起来的时候，让浏览器自动打开
  --package.json
      "scripts": {
      "serve": "vue-cli-service serve --open",***
      "build": "vue-cli-service build",
      "lint": "vue-cli-service lint"
      },

2.2 关闭eslint校验工具（不关闭会有各种规范，不按照规范就会报错）
  --根目录下创建vue.config.js,进行配置

    module.exports = {
    //关闭eslint
    lintOnSave: false
    }

2.3 src文件夹配置别名,创建jsconfig.json，用@/代替src/，exclude表示不可以使用该别名的文件
   {
    "compilerOptions": {
        "baseUrl": "./",
            "paths": {
            "@/*": [
                "src/*"
            ]
        }
    },

    "exclude": [
        "node_modules",
        "dist"
    ]
 }


 3.项目路由分析
 vue-router
 前端所谓路由：kv键值对
 key:URL(地址栏中的路径)
 value:相应的路由组件
 注意：项目上中下结构

 路由组件：
 Home首页路由组件、Search搜索路由组件、Login登录路由、Register注册路由
 非路由组件：
 Header【首页、搜索页】
 Footer【在首页、搜索页】，但是在登录页面是没有的


 4、完成Header、Footer非路由组件业务
 在项目中，不以HTML,CSS为主，主要锻炼业务、逻辑
 在开发项目的时候：
 1.书写静态页面（HTML+CSS）
 2.拆分组件
 3.获取服务器的数据动态展示
 4.完成相应的动态业务逻辑

 注意1：创建组件的时候，组件结构 + 组件的样式 + 图片资源
 注意2：本项目采用less样式，浏览器不识别less样式，需要通过less,less-loader【安装6版本的】进行处理less,把less样式变为css样式，浏览器才可以识别（npm install --save less less-loader@6）

 注意3：如果想要组件识别less样式，需要style标签上加上lang='less'

 4.1使用组件的步骤（非路由组件）
  1.创建或定义  （一般在components文件夹中创建.vue文件）
  2.引入        （import .. from ...）
  3.注册          (一般在APP.vue文件中，components:{Hello})
  4.使用          （一般在<template><div> <Hello/> </div></template>）


5)路由组件的搭建
vue-router(安装路由，vue2项目，npm i --save vue-router@3 )
上面分析时，路由组件有四个：Home,Search,Register,Login
-components文件夹：经常放置非路由组件（共用全局组件）
-pages|views文件夹：经常放置路由组件

5.1配置路由
项目当中配置的路由一般放置在router文件夹中

5.2总结
路由组件与非路由组件的区别？
1：路由组件一般放置在pages|views文件夹，非路由组件一般放置在components文件夹中
2：路由组件一般需要在router文件夹中进行注册（使用的即为组件的名字），非路由组件在使用的时候，一般都是以标签的形式使用
3：注册完路由，不管路由组件还是非路由组件，身上都有$route,$router属性

$route:一般获取路由信息【路径、query、params等等】
$router：一般进行编程式导航进行路由跳转【push | replace】

5.3路由的跳转？
路由的跳转有两种形式：
声明书导航router-link,可以进行路由的跳转
编程式导航push|replace,可以进行路由跳转

编程式导航：声明书导航能做的，编程式导航都能在
但是编程式导航除了可以进行路由跳转，还可以做一些其他的业务逻辑



