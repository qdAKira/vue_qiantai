import { reqShoppingCart, reqDeleteCartById,reqUpdateCheckedById } from '@/api/index'
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