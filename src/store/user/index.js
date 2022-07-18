//登录与注册的模块
import { reqGetCode, reqUserLogin, reqUserRegister } from "@/api";
const state = {
  code:'',
  token:''
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
  }
};
const getters = {};
export default {
  state,
  actions,
  mutations,
  getters
}