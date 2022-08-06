import { reqCategoryList, reqBannerList, reqFloorList } from "@/api";

// home模块的仓库
const state = {
  // state中的数据默认初始值不能瞎写，根据接口返回值初始化
  // home仓库中存储三级菜单的数据
  categoryList: [],
  // 轮播图的数据
  bannerList: [],
  // floor数组的数据
  floorList: []
}
const mutations = {
  CATEGORYLIST(state, categoryList) {
    state.categoryList = categoryList
  },
  GETBANNERLIST(state, bannerList) {
    state.bannerList = bannerList
  },
  GETFLOORLIST(state, floorList) {
    state.floorList = floorList
  }
}
const actions = {
  // 通过API里面的接口函数调用，向服务器发请求，获取服务器的数据
  async categoryList({ commit }) {
    let result = await reqCategoryList()
    if (result.code === 200) {
      commit('CATEGORYLIST', result.data)
    }
  },
  // 获取首页轮播图的数据
  async getBannerList({ commit }) {
    let result = await reqBannerList()
    if (result.code === 200) {
      commit('GETBANNERLIST', result.data)
    }
  },
  // 获取floor的数据
  async getFloorList({ commit }) {
    let result = await reqFloorList()
    if (result.code === 200) {
      commit('GETFLOORLIST', result.data)
    }
  },
}
const getters = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}

