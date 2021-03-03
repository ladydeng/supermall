<template>
  <tab-bar>
      <tab-bar-item path="/home" activeColor="deepPink">
        <!-- ./表示同级目录，../表示上一级目录，../../表示往上跳两级所在的目录 -->
        <img slot="item-icon" src="~assets/images/tabbar/icon01.png" />
        <img slot="item-icon-active" src="~assets/images/tabbar/icon01_active.png" />
        <p slot="item-text">首页</p>
      </tab-bar-item>
      <tab-bar-item path="/category" activeColor="deepPink">
        <img slot="item-icon" src="~assets/images/tabbar/icon02.png" />
        <img slot="item-icon-active" src="~assets/images/tabbar/icon02_active.png" />
        <p slot="item-text">分类</p>
      </tab-bar-item>
      <tab-bar-item path="/cart" activeColor="deepPink">
        <img slot="item-icon" src="~assets/images/tabbar/icon03.png" />
        <img slot="item-icon-active" src="~assets/images/tabbar/icon03_active.png" />
        <p slot="item-text">购物车</p>
      </tab-bar-item>
      <tab-bar-item path="/profile" activeColor="deepPink">
        <img slot="item-icon" src="~assets/images/tabbar/icon04.png" />
        <img slot="item-icon-active" src="~assets/images/tabbar/icon04_active.png" />
        <p slot="item-text">我的</p>
      </tab-bar-item>
    </tab-bar>
</template>

<script>
import TabBar from "components/common/tabbar/TabBar"
import TabBarItem from "components/common/tabbar/TabBarItem"

export default {
    name: 'MainTabBar',
    components: {
    TabBar,
    TabBarItem,
  },
}
</script>

<style>

</style>