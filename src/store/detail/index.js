import {reqGoodsInfo,reqAddShopping} from '@/api'
const state = {
  goodInfo:{}
};
const actions = {
  // 获取商品详情的action
  async getGoodInfo({commit},skuId){
    let result = await reqGoodsInfo(skuId);
    if(result.code == 200){
      commit('GETGOODSINFO',result.data)
    }
  },
  // 获取添加到购物车的action
  async getAddShopping({commit},{skuId,skuNum}){
    let result   =  await reqAddShopping(skuId,skuNum);
    if(result.code == 200){
      // 返回成功
      return 'ok'
    }else{
      // 返回失败
      return Promise.reject(new Error('faile'))
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
