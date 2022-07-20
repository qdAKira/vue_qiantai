//登录与注册的模块
import { reqGetCode, reqLogout, reqUserInfo, reqUserLogin, reqUserRegister } from "@/api";
import { setToken,getToken,removeToken } from "@/utils/token";
const state = {
  code:'',
  token:getToken(),
  userInfo:{}
};
const actions = {
  // 获取验证码
  async getCode({commit},phone){
    // 获取验证码的这个接口，把验证码返回，但是正常情况，后台把验证码发到用户手机上
   let reslut = await reqGetCode(phone)
   if(reslut.code ==200){
    commit('GETCODE',reslut.data);
    return 'ok'
   }else{
    return Promise.reject(new Error('faile'))
   }
  },

  // 用户注册
  async userRegister({commit},user){
  let reslut =  await reqUserRegister(user);
  if(reslut.code == 200){
    return 'ok'
  }else{
    return Promise.reject(new Error('faile'))
  }
  },

  //用户登录
  async userLogin({commit},data){
    let reslut =  await reqUserLogin(data)
    //服务器下发token,用户唯一标识符（uuid）
    //将来经常通过带token找服务器要用户信息进行展示
    if(reslut.code == 200){
      commit('USERLOGIN',reslut.data.token);
      // 持久化存储token
      setToken(reslut.data.token)
      return 'ok'
    }else{
      return Promise.reject(new Error('faile'))
    }
  },

  // 获取用户信息,在home页面中派发action
  async getUserInfo({commit}){
    let reslut =  await reqUserInfo();
    // console.log(reslut);
    if(reslut.code ==200){
      // 提交用户信息
      commit('GETUSERINFO',reslut.data)
      
    }
  },
  // 退出登录
  async userLogout({commit}){
    let reslut =   await reqLogout();
    if(reslut.code ==200){
      commit('CLEAR');
      return 'ok'
    }else{
      return Promise.reject(new Error('faile'))
    }
  }
};
const mutations = {
  GETCODE(state,code){
    state.code = code
  },
  USERLOGIN(state,token){
    state.token = token
  },
  GETUSERINFO(state,userInfo){
    state.userInfo = userInfo
  },
  // 清除本地数据
  CLEAR(state){
    // 把仓库以及本地存储数据清空
    state.token = '';
    state.userInfo = {};
    removeToken()
  }
};
const getters = {};
export default {
  state,
  actions,
  mutations,
  getters
}