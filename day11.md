复习：
1.完成了登录与注册的静态组件【assets文件夹：组件共用的静态资源，css当中书写@符号】
2.表单验证暂时没有处理，最后一天统一处理
3.vuex存储数据非持久化

******************************************

1)登录过后首页用户信息的展示
  url:/api/user/passport/auth/getUserInfo method:get
  1.1当用户注册完成，用户登录【用户名+密码】向服务器发请求（组件派发action:userLogin）,登录成功获取到token，存储到仓库当中（非持久化），路由跳转到home首页。

  1.2因此在首页当中（mounted）派发action(getUserInfo)获取用户信息，动态展示header组件内容

  1.3一刷新home首页，获取不到用户信息

  1.4持久化存储token

  1.5存在问题1，多个组件展示用户信息需要在每一个组件的mounted中触发，this.$store.dispatch('getUserInfo')

  1.6存在问题2，用户已经登录了，就不应该再登录页

2)Header组件显示用户名与退出登录


3）持久化存储token

4)退出登录


5）导航守卫
全局守卫：项目中

路由独享守卫：

组件内守卫：

例如：用户已经登录，用户不应该还能到login页面

6）交易页面

  获取用户地址信息 /api/user/userAddress/auth/findUserAddressList    ,get