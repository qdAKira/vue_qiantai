1)个人中心完成
  面试的时候：是否封装过组件？分页器、日历
  个人中心当中：分页器

2）全局守卫
未登录访问，交易相关（trade）、支付相关（pay,paySuccess）、用户中心（center）相关跳转到登录页面


3）路由独享守卫
只有从购物车页面才能跳转到交易页面（创建订单）
只有从交易页面，才能跳转到支付页面
只有从支付页面才能跳转到支付成功页面


4）图片懒加载(插件)
https://www.npmjs.com/package/vue-lazyload
注意：安装的版本1.3.3，最新的加载不出
  1.npm i vue-lazyload -S
  2.在main文件中引入，使用

        // 图片懒加载引入
      import VueLazyload from 'vue-lazyload'
      import pay from '@/assets/images/pay.png'

      Vue.use(VueLazyload,{
        // 懒加载默认图片
        loading:pay
      })
  3.在需要的地方，使用指令v-lazy

5表单验证【后台管理系统：大量使用elementUI】 以后工作的时候经常会进行表单验证【element-ui】进行表单验证，so 简单。 项目当中表单验证功能比较常见的。

5.1vee-validate插件：Vue官方提供的一个表单验证的插件【老师接下来的操作能大概看懂即可】 这个插件很难用：如果你翻看它的文档（看一个月：不保证能看懂），依赖文件很多（文档书写的很难理解） 花大量时间学习，很难搞懂。

5.2哪怕将来工作了，真的使用vee-valadiate【老师项目搞出来：改老师代码即可】

使用步骤： 1：安装vee-valadite，别安装最新版本@2 2：在plugins文件夹中创建一个validate.js[专门注册vee-valadite] 3:注册插件 4：注册插件的时候，用中文，以及需要验证的字段【用中文显示提示形式】 5：在入口文件需要引入执行一次 6:使用vee-valadiate插件

 vee-validate 基本使用

    第一步：插件安装与引入 cnpm i vee-validate@2 --save 安装的插件安装2版本的

    import VeeValidate from 'vee-validate' import zh_CN from 'vee-validate/dist/locale/zh_CN' // 引入中文 message Vue.use(VeeValidate)

    第二步：提示信息 VeeValidate.Validator.localize('zh_CN', { messages: { ...zh_CN.messages, is: (field) => ${field}必须与密码相同 // 修改内置规则的 message，让确认密码和密码相同 }, attributes: { // 给校验的 field 属性名映射中文名称 phone: '手机号', code: '验证码', password:'密码', password1:'确认密码', isCheck:'协议' } })

    第三步：基本使用 {{ errors.first("phone") }}

    const success = await this.$validator.validateAll(); //全部表单验证 
    //自定义校验规则 //定义协议必须打勾同意 
    VeeValidate.Validator.extend('agree', { validate: value => { return value }, getMessage: field => field + '必须同意' })

6）路由懒加载
  主要修改路由引入方式
  Vue官网VueRouter，指南、进阶中
  当打包构建应用时，JavaScript 包会变得非常大，影响页面加载。如果我们能把不同路由对应的组件分割成不同的代码块，然后当路由被访问的时候才加载对应组件，这样就更加高效了。
示例：
   {
          path:'groupOrder',
          name:'GroupOrder',
          component:()=>import('@/pages/Center/GroupOrder'),****
    }

7）打包上线
执行：npm run build

dist文件下的js文件存放我们所有的js文件，并且经过了加密，并且还会生成对应的map文件。

map文件作用：因为代码是经过加密的，如果运行时报错，输出的错误信息无法准确得知时那里的代码报错。有了map就可以向未加密的代码一样，准确的输出是哪一行那一列有错。

当然map文件也可以去除（map文件大小还是比较大的）
在vue.config.js配置productionSourceMap: false即可。
注意：vue.config.js配置改变，需要重启项目
