import { reqShoppingCart, reqDeleteCartById,reqUpdateCheckedById } from '@/api/index'
import { Promise } from 'core-js';
const state = {
  cartList: []
};
const actions = {
  // 获取购物车列表数据
  async getShoppingCart({ commit }) {
    let reslut = await reqShoppingCart()
    if (reslut.code == 200) {
      commit('GETSHOPPINGCART', reslut.data)
    }
  },
  // 删除购物车某一产品
  async deleteShoppingCart({ commit },skuId) {
    let reslut = await reqDeleteCartById(skuId);
    if (reslut.code == 200) {
      return 'ok'
    }else{
      return Promise.reject(new Error('faile'))
    }
  },

  //修改购物车某一个产品的选中状态
  async updateCheckedById({commit},{skuId,isChecked}){
     let reslut = await reqUpdateCheckedById(skuId,isChecked)
     if (reslut.code == 200) {
      return 'ok'
    }else{
      return Promise.reject(new Error('faile'))
    }
   },

   //删除全部勾选的产品
   deleteAllCheckedCart({dispatch,getters}){
    //context:小仓库，commit【提交mutations修改state】getters【计算属性】dispatch【派发action】 state【当前仓库数据】
    // console.log(context);
    // console.log(getters);
    let promiseAll = []
    getters.cartList.cartInfoList.forEach(item => {
    let promise= item.isChecked==1? dispatch('deleteShoppingCart',item.skuId):'';
    // 将每一次返回的promise添加到数组中
      promiseAll.push(promise)
    });
    // 只要p1,p2都成功，返回结果即为成功，反之失败
    return Promise.all(promiseAll)
   },

   //修改全部产品的状态
   updateAllCartIsChecked({dispatch,state},isChecked){
    // console.log(state);
    let promiseAll = [];
    state.cartList[0].cartInfoList.forEach(item=>{
      let promise = dispatch('updateCheckedById',{skuId:item.skuId,isChecked})
      promiseAll.push(promise)
    });
    // 返回最终结果
    return Promise.all(promiseAll)
   }
};
const mutations = {
  GETSHOPPINGCART(state, cartList) {
    state.cartList = cartList
  }
};
const getters = {
  cartList(state) {
    return state.cartList[0] || {}
  }
};
export default {
  state,
  actions,
  mutations,
  getters
}