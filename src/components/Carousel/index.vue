<template>
  <div class="swiper-container" ref="floor1Swiper">
    <div class="swiper-wrapper">
      <div
        class="swiper-slide"
        v-for="(carousel, index) in list"
        :key="carousel.id"
      >
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
import Swiper from "swiper";
export default {
  name: "Carousel",
  props:['list'],
  watch: {
    list: {
      //立即监听：不管数据有没有变化，上来立即监听一次
      //为什么watch监听不到list：因为这个数据从来没有发生变化（数据是父亲给的，父亲给的是一个对象，里面本来就有数据）
      immediate: true,
      handler() {
        //只能监听到数据已经有了，但是v-for动态渲染结构是否完成，无法确定，因此还是需要nextTick
        this.$nextTick(() => {
          let mySwiper = new Swiper(this.$refs.floor1Swiper, {
            pagination: {
              el: ".swiper-pagination",
              clickable: true, //开启分页器，即能点击轮播图下小圆点，实现图片切换
            },
            // 如果需要前进后退按钮
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },
            // 如果需要滚动条
            scrollbar: {
              el: ".swiper-scrollbar",
            },
          });
        });
      },
    },
  },
};
</script>

<style scoped>

</style>