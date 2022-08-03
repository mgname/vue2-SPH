import Vue from 'vue'
import App from './App.vue'
// 引入路由
import router from '@/router'

// 三级联动组件---全局组件
import TypeNav from '@/pages/Home/TypeNav'
Vue.component(TypeNav.name, TypeNav)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  // 注册路由
  // 注册路由信息：当这里书写router的时候，组件身上都拥有$route、$router
  router
}).$mount('#app')
