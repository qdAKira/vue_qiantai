import {reqBannerList, reqCategoryList,reqFloorList} from '@/api'
//home模块小仓库
const state = {
  //home仓库中存储三级菜单的数据
  categoryList:[],
  //轮播图的数据
  bannerList:[],
  //Floor的数据
  floorList:[]
};
const actions = {
  //通过API里面的接口函数调用，向服务器发请求，获取服务器的数据
  //注意：使用action时，函数的第一个参数，必须是{commit}，即使不涉及到mutations操作，也必须加上该参数，否则会报错。
  async categoryList({commit}){
    let result = await reqCategoryList();
    if(result.code == 200){
      commit('CATEGORYLIST',result.data)
    }
  },

  //获取首页轮播图的数据，因为返回的是promise数据，所以要用await和async
  async getBannerList({commit}){
    let result = await reqBannerList();
    if(result.code == 200){
      commit('GETBANNERLIST',result.data)
    }
  },

  //获取floor的数据
  async getFloorList({commit}){
      let result  = await reqFloorList();
      if(result.code ==200){
        commit('GETFLOORLIST',result.data)
      }
  }
};
const mutations = {
  CATEGORYLIST(state,categoryList){
    state.categoryList = categoryList.slice(0,16)
  },
  GETBANNERLIST(state,bannerList){
    state.bannerList = bannerList
  },
  GETFLOORLIST(state,value){
    state.floorList = value
  }
};
const getters = {
  
};

//对外暴露
export default {
  state,
  actions,
  mutations,
  getters
}