import {reqShoppingCart} from '@/api/index'
const state = {
  cartList:[]
};
const actions = {
  // 获取购物车列表数据
 async getShoppingCart({commit}){
  let reslut = await reqShoppingCart()
  if(reslut.code == 200){
    commit('GETSHOPPINGCART',reslut.data)

  }
  }
};
const mutations = {
  GETSHOPPINGCART(state,cartList){
    state.cartList = cartList
  }
};
const getters = {
  cartList(state){
    return state.cartList[0] ||{}
  }
};
export default {
  state,
  actions,
  mutations,
  getters
}