import Vuex from "vuex"
import Vue from "vue"

// 引入仓库
import home from "./home"
import search from "./search"
// 使用插件
Vue.use(Vuex)

// 对外暴露Store类的一个实例
export default new Vuex.Store({
  // 实现Vuex仓库模块式开发存储数据
  modules: {
    home,
    search
  }
})