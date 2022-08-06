<template>
  <!--banner轮播-->
  <div class="swiper-container" ref="mySwiper">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="carousel in list" :key="carousel.id">
        <img :src="carousel.imgUrl" />
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
import Swiper from 'swiper'
export default {
  name: 'Carousel',
  props: ['list'],
  watch: {
    // 监听bannerList数据的变化:因为这条数据发生过变化----由空数组变为数组里面有四个元素
    // 当前这个函数执行:只能保证bannerList数据已经有了，但是你没办法保证v-for已经执行结束了	
    // v-for执行完毕，才有结构【现在在watch当中没办法保证的】
    list: {
      immediate: true,
      handler() {
        this.$nextTick(() => {
          // 当你执行这个回调的时候:保证服务器数据回来了，v-for执行完毕了【轮播图的解构一定有了】
          let mySwiper = new Swiper(this.$refs.mySwiper, {
            // 循环切换
            loop: true,
            // 分页器
            pagination: {
              el: '.swiper-pagination',
              // 点击小球切换图片
              clickable: true
            },
            // 前进后退按钮
            navigation: {
              nextEl: 'swiper-button-next',
              prevEl: 'swiper-button-prev'
            }
          })
        })
      }
    }
  }
}
</script>

<style>

</style>