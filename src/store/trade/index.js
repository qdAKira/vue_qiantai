import { reqAddressInfo, reqOrder } from "@/api";
const state = {
  address:[],
  orderInfo:{}
};
const actions = {
  // 获取用户地址信息
  async getUserAddress({commit}) {
    let reslut = await reqAddressInfo()
    if(reslut.code ==200){
      commit('GETUSERADDRESS',reslut.data)
    }
  },
  // 获取订单交易页信息
  async getOrder({commit}){
    let reslut = await reqOrder()
    if(reslut.code ==200){
      commit('GETORDER',reslut.data)
    }
  }
};
const mutations = {
  GETUSERADDRESS(state,address){
    state.address = address
  },
  GETORDER(state,orderInfo){
    state.orderInfo = orderInfo
  }
};
const getters = {};

export default {
  state,
  actions,
  mutations,
  getters
}