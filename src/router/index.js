// 配置路由的地方
import VueRouter from "vue-router";
import Vue from "vue";

// 使用插件
Vue.use(VueRouter)

// 引入路由组件
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Search from "@/pages/Search";

// 编程式导航跳转到当前路由（参数不变），多次执行会抛出NavigationDuplicated的警告错误
// 因为vue-router3.5.3版本引入的promise，push、replace方法需要传递回调函数

// 先把VueRouter原型对象的push保存一份
let originPush = VueRouter.prototype.push
let originReplace = VueRouter.prototype.replace

// 重写push | replace
// 第一个参数：告诉原来push方法，往哪跳转（传递哪些参数）
// 第二个参数：成功的回调
// 第三个参数：失败的回调
VueRouter.prototype.push = function (location, resolve = () => {}, reject= () => {}) {
  originPush.call(this, location, resolve, reject)
}
VueRouter.prototype.replace = function (location, resolve = () => {}, reject= () => {}) {
  originReplace.call(this, location, resolve, reject)
}

// 配置路由
export default new VueRouter({
  // 配置路由
  routes: [
    // 重定向，在项目跑起来的时候，访问/，立马让它定向到首页
    {
      path: '*',
      redirect: '/home'
    },
    {
      path: '/home',
      component: Home,
      // 通过路由元信息判断Footer显示与隐藏 
      meta: { show: true }
    },
    {
      path: '/login',
      component: Login,
      meta: { show: false }
    },
    {
      path: '/register',
      component: Register,
      meta: { show: false }
    },
    {
      name: 'search',
      path: '/search/:keyword?',
      component: Search,
      meta: { show: true },
      // 路由组件能传递props数据需要先配置
      // 布尔值写法：只能把params参数作为路由组件身上的属性
      // props: true
      // 对象写法：额外的给路由组件传递一些props
      // props: {a: 1, b: 2}
      // 函数写法：可以把params参数、query参数作为props传递给路由组件
      // props: ($route) => {
      //   return {
      //     keyword: $route.params.keyword,
      //     k: $route.query.k
      //   }
      // }
    }
  ]
})