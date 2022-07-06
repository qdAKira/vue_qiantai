import { reqSearchInfo } from "@/api";
//search模块小仓库
const state = {
  searchList:{}
};
const actions = {
//获取seacrh模块数据
  async getSearchList({commit},params={}){
    //params形参：是当用户派发action的时候，第二个参数传递过来的，至少是一个空对象
   let result = await reqSearchInfo(params)
  //  console.log(result);
   if(result.code==200){
    commit('GETSEARCHLIST',result.data)
   }
  }
};
const mutations = {
  GETSEARCHLIST(state,value){
    state.searchList = value
  }
};
const getters = {
  goodList(state){
    //state.searchList.goodsList如果服务器数据回来，没有问题是一个数据
    // 假如网络不好，没有网state.searchList.goodsList应该返回的是underfined
    return state.searchList.goodsList || []
  },
  trademarkList(state){
    return state.searchList.trademarkList
  },
  attrsList(state){
    return state.searchList.attrsList
  },
};

//对外暴露
export default {
  state,
  actions,
  mutations,
  getters
}