<template>
  <div id="homeSwiper">
    <swiper>
      <swiper-item v-for="(item, index) in banners" :key="index">
        <a :href="item.link">
          <img :src="item.image" @load="imageLoad"/>
        </a>
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
import { Swiper, SwiperItem } from "components/common/swiper";

export default {
  name: "HomeSwiper",
  data(){
    return {
      isLoad:false
    }
  },
  components:{
      Swiper,
      SwiperItem
  },
  props: {
      banners:{
          type:Array,
          // 数组／对象的默认值应当由一个工厂函数返回
          default(){
              return []
          }
      }
  },
  methods:{
    imageLoad(){
      if(!this.isLoad){
        this.$emit("swiperImageLoad")
        this.isLoad = true
      }
    }
  }
};
</script>

<style>
</style>