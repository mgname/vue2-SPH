import { reqSearchInfo } from '@/api'

// search模块的仓库
const state = {
  searchList: {}
}
const mutations = {
  GETSEARCHLIST(state, searchList) {
    state.searchList = searchList
  }
}
const actions = {
  // 获取Search模块数据
  async getSearchList({ commit }, params = {}) {
    let result = await reqSearchInfo(params)
    if (result.code === 200) {
      commit('GETSEARCHLIST', result.data)
    }
  }
}

const getters = {
  // 当前形参state，当前仓库中的state，并非大仓库中的state
  goodsList(state) {
    return state.searchList.goodsList || []
  },
  tradeMarkList(state) {
    return state.searchList.trademarkList
  },
  attrsList(state) {
    return state.searchList.attrsList
  },
  total(state) {
    return state.searchList.total
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}