<template>
  <div id="app">
    <!-- 这里Detail使用了exclude是因为我们的详情页不需要保留它的状态，每次点击一个商品，它都是一个不同商品详情页，所以它不需要缓存 -->
    <keep-alive exclude="Detail">
      <router-view></router-view>
    </keep-alive>
    
    <main-tab-bar></main-tab-bar>
  </div>
</template>

<script>
import MainTabBar from "components/content/mainTabBar/MainTabBar"

export default {
  name: "App",
  components: {
    MainTabBar
  },
};
</script>

<style>
@import "assets/css/base.css";
</style>
