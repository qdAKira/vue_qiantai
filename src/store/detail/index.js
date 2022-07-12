import {reqGoodsInfo} from '@/api'
const state = {
  goodInfo:{}
};
const actions = {
  async getGoodInfo({commit},skuId){
    let result = await reqGoodsInfo(skuId);
    if(result.code == 200){
      commit('GETGOODSINFO',result.data)
    }
  }
};
const mutations = {
  GETGOODSINFO(state,goodInfo){
    state.goodInfo = goodInfo
  }
};
const getters = {
  // 路径导航简化的数据
  categoryView(state){
    // 比如：state.goodInfo初始状态空对象，空对象的categroyView属性值undefined
    // 当前计算出的categroyView属性值至少是一个空对象，警告不再有
    return state.goodInfo.categoryView ||{}
  },
  // 简化产品信息的数据
  skuInfo(state){
    return state.goodInfo.skuInfo || {}
  },
  // 产品的售卖属性的简化
  spuSaleAttrList(state){
    return state.goodInfo.spuSaleAttrList ||[]
  }

};

export default {
  state,
  actions,
  mutations,
  getters

}
