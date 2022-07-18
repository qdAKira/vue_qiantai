//当前这个模块：API进行统一管理
import requests from './request'
import mockRequests from './mockAjax'

//三级联动接口
///api/product/getBaseCategoryList   get  无参数

export const reqCategoryList = ()=>{
  return requests({url:'/product/getBaseCategoryList',method:'get'})
}

//获取banner（Home首页轮播图接口）
export const reqBannerList = ()=>{
  return mockRequests({url:'/banner',method:'get'})
}

//获取floor数据
export const reqFloorList = ()=> mockRequests.get('/floor')

//获取搜索模块数据，地址：/api/list，请求方式： post
/*例子
{
  "category3Id": "61",
  "categoryName": "手机",
  "keyword": "小米",
  "order": "1:desc",
  "pageNo": 1,
  "pageSize": 10,
  "props": ["1:1700-2799:价格", "2:6.65-6.74英寸:屏幕尺寸"],
  "trademark": "4:小米"
}
*/
//当前这个接口，给服务器传递参数params，至少为一个空对象
export const reqSearchInfo = (params)=>{
  return requests({url:'/list',method:'post',data:params})
}

// 获取商品详情，接口/api/item/{ skuId }，请求方式：GET，返回的数据为一个对象
export const reqGoodsInfo = (skuId)=>{
  return requests({url:`/item/${skuId}`,method:'get'})
}

//添加到购物车(对已有物品进行数量改动)/api/cart/addToCart/{ skuId }/{ skuNum },请求方式：post,增删改查一般都需要调用接口
export const reqAddShopping = (skuId,skuNum)=>{
  return requests({url:`/cart/addToCart/${skuId}/${skuNum}`,method:'post'})
} 

//获取购物车列表数据接口，/api/cart/cartList，请求方式GET
export const reqShoppingCart = ()=>{
  return requests({url:'/cart/cartList',method:'get'})
}

//获取删除购物车商品接口，/api/cart/deleteCart/{skuId}，请求方式，delete
export const reqDeleteCartById = (skuId)=>{
  return requests({url:`/cart/deleteCart/${skuId}`,method:'delete'})
}

//获取切换商品选中状态接口，/api/cart/checkCart/{skuId}/{isChecked}，请求方式get

export const reqUpdateCheckedById = (skuId,isChecked)=>{
 return requests({url:`/cart/checkCart/${skuId}/${isChecked}`,method:'get'})
}

//获取验证码接口，/api/user/passport/sendCode/{phone} get
export const reqGetCode = (phone)=>{
  return requests({url:`/user/passport/sendCode/${phone}`,method:'get'})
}

// 获取用户注册的接口，/api/user/passport/register，post
export const reqUserRegister = (data)=>{
  return requests({url:'/user/passport/register',data,method:'post'})
}

//登录接口，/api/user/passport/login，请求方式POST，携带参数phone,password
export const reqUserLogin = (data)=>{
 return requests({url:'/user/passport/login',data,method:'post'})
}