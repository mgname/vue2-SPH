<template>
  <div id="app">
    <Header></Header>
    <!-- 路由组件出口的地方 -->
    <router-view></router-view>
    <!-- 根据路由元信息判断是否显示Footer，Footer在Home、Search显示，在登录注册隐藏 -->
    <Footer v-show="$route.meta.show"></Footer>
  </div>
</template>

<script>
import Header from './components/Header'
import Footer from './components/Footer'

export default {
  name: 'App',
  components: {
    Header,
    Footer
  },
  mounted() {
    // 通知Vuex发送请求，获取商品分类的三级列表的数据，存储于仓库当中（在App组件中只用发送一次请求即可）
    this.$store.dispatch('home/categoryList')
  },
}
</script>

<!-- 使用less需要下载：less、less-loader，不用配置 -->
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
