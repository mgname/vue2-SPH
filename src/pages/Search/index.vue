<template>
  <div>
    我是搜索
    <!-- {{ keyword }} -->
    {{ $route.params.keyword }}
    {{ $route.query.k }}
  </div>
</template>

<script>
export default {
  // 路由组件可以传递props
  // props: ['keyword']
}
</script>

<style>

</style>