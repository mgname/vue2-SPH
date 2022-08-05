import { reqCategoryList } from "@/api";
// home模块的仓库

const state = {
  // state中的数据默认初始值不能瞎写，根据接口返回值初始化
  categoryList: []
}
const mutations = {
  CATEGORYLIST(state, categoryList) {
    state.categoryList = categoryList
  }
}
const actions = {
  // 通过API里面的接口函数调用，向服务器发请求，获取服务器的数据
  async categoryList({ commit }) {
    let result = await reqCategoryList()
    if (result.code === 200) {
      commit('CATEGORYLIST', result.data)
    }
  }
}
const getters = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}

