//登录与注册的模块
import { reqGetCode, reqUserRegister } from "@/api";
const state = {
  code:''
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
  }
};
const mutations = {
  GETCODE(state,code){
    state.code = code
  }
};
const getters = {};
export default {
  state,
  actions,
  mutations,
  getters
}