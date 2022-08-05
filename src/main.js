import Vue from 'vue'
import App from './App.vue'
// 引入路由
import router from '@/router'
// 引入仓库
import store from '@/store'

// 三级联动组件---全局组件
import TypeNav from '@/components/TypeNav'
Vue.component(TypeNav.name, TypeNav)

Vue.config.productionTip = false

let vm = new Vue({
  render: h => h(App),
  // 注册路由
  // 注册路由信息：当这里书写router的时候，组件身上都拥有$route、$router
  router,
  // 注册仓库：组件实例的身上会多一个$store属性
  store
}).$mount('#app')