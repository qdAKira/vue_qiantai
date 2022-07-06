
复习：
1）商品分类的三级列表由静态变为动态形式【获取服务器数据；解决跨域问题】
2）防抖与节流【面试经常出现】
3)路由跳转的两种方式

1）开发Search模块中的TypeNav商品分类菜单（过渡动画效果）
过渡动画：前提组件|元素务必要有v-if|v-show指令才能进行过渡动画

2）商品分类三级列表的优化？
  mounted() {
    //通知vuex发送请求，获取数据，存储到仓库
    //派发一个action||获取商品分类的三级列表的数据
    this.$store.dispatch("categoryList");
  },
将请求放到APP根组件中，只请求一次

3)合并参数
  if(this.$route.query){
          let location = {name:'search',params:{keyword:this.keyword || undefined}}
          location.query = this.$route.query;  ***(合并语句，把query参数合并到params中)
          this.$router.push(location)
        }

4）开发home首页当中的listContainer组件与Floor组件？
  注意：服务器返回的数据（接口）只有商品分类菜单分类数据，对于ListContainer组件与Floor组件数据服务器没有提供的
  mock数据（模拟）：如果要mock数据，需要用到插件mockjs
  1.安装mockjs(npm i mockjs)

  使用步骤：
  1）在项目中src文件夹中创建mock文件夹
  2）第二步准备JSON数据（mock文件夹中创建相应的JSON文件）----格式化一下，别留有空格（有的话跑不起来）
  3）把mock数据需要的图片放置到public文件夹中【public文件夹在打包的时候，会把相应的资源原封不动打包到dist文件夹】
  4）创建mockServer.js通过mockjs插件实现模拟数据
  5）mockServer.js文件在入口文件中引入

5)ListContainer组件开发重点？
  安装Swiper插件：最新版本6，安装的是swiper@5
  npm i --save swiper@5

  使用步骤：
  1.引包（相应js|CSS）
  2.页面中结构务必要有
  3.new Swiper实例【轮播图添加动态效果】

  注意：clickable: true,//开启分页器，即能点击轮播图下小圆点，实现图片切换
  