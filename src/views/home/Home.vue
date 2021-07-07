<template>
  <div id="home">
    <!-- 头部 -->
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>

    <!-- 控制菜单 -->
    <tab-control
      :titles="['流行', '新款', '精选']"
      @tabClick="tabClick"
      ref="tabControl1"
      class="tabControl"
      v-show="isTabFixed"
    />

    <scroll
      class="content"
      ref="wrapper"
      :probe-type="3"
      @scroll="contentClick"
      :pull-up-load="true"
      @pullingup="loadMore"
    >
      <!-- 轮播 -->
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad" />

      <!-- 推荐 -->
      <recommend-view :recommends="recommends" />

      <!-- 本周流行 -->
      <feature-view />

      <!-- 控制菜单 -->
      <tab-control
        :titles="['流行', '新款', '精选']"
        @tabClick="tabClick"
        ref="tabControl2"
      />

      <!-- 商品列表 -->
      <goods-list :goods="showGoods" />
    </scroll>

    <back-top @click.native="backClick" v-show="isShow" />
  </div>
</template>

<script>
// 只有导出的时候是default才能使用import+自定义名字
import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "components/content/goods/GoodList";
import BackTop from "components/content/backTop/BackTop";

import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView";
import FeatureView from "./childComps/FeatureView";

import { getHomeMultidata, getHomeGoods } from "network/home";
import { itemListenerMixin, backTopMixin } from "common/mixin";

import scroll from "components/common/scroll/Scroll";

export default {
  name: "Home",
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      currentType: "pop",
      // isShow: false,
      tabOffsetTop: 0,
      isTabFixed: false,
    };
  },
  components: {
    NavBar,
    TabControl,
    GoodsList,
    BackTop,

    HomeSwiper,
    RecommendView,
    FeatureView,

    scroll,
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    },
  },
  methods: {
    /**
     * 事件监听相关方法
     */

    contentClick(position) {
      // console.log(position)
      //  1.判断backTop是否显示
      // 当鼠标下滑的位置大于1000时，回到顶部按钮显示
      // -position.y > 1000 ? this.isShow = true : this.isShow = false;
      this.isShow = -position.y > 1000;

      // 2.决定tabControl是否吸顶（position:fixed）
      this.isTabFixed = -position.y > this.tabOffsetTop;
    },

    loadMore() {
      // 调用封装好的加载
      this.getHomeGoods(this.currentType);
    },

    swiperImageLoad() {
      // 所有的组件都有一个$el：用于获取组件的元素
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
    },

    /**
     * 自定义事件
     */
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      this.$refs.tabControl1.currentItem = index;
      this.$refs.tabControl2.currentItem = index;
    },

    /**
     * 网络请求
     */
    getHomeMultidata() {
      getHomeMultidata().then((res) => {
        //把请求回来的数据保存到我们data里面的数组
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
        // console.log(res.data.recommend.list)
      });
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      // 这里的getHomeGoods是发送网络请求
      getHomeGoods(type, page).then((res) => {
        // push(...array) 指把数组里的元素一个个解析出来push到我们的数组里
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;

        // 允许多次上拉加载更多
        this.$refs.wrapper.finishPullUp();
      });
    },
  },
  mixins: [itemListenerMixin,backTopMixin],
  created() {
    // 1.请求多个数据
    this.getHomeMultidata();

    // 2.请求商品数据
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  mounted() {
    // console.log("Home混入");
  },
  deactivated() {
    // 在组件移除的过程中，取消全局事件的监听
    this.$bus.$off("itemImageLoad", this.itemListener);
  },
};
</script>

<style scoped>
#home {
  height: 100vh;

  position: relative;
}

.home-nav {
  background-color: var(--color-tint);
  color: white;

  /* position: fixed;
  left: 0;
  top: 0;
  right: 0;
  z-index: 100; */
}

/* #home {
  padding-top: 44px;
} */

.content {
  /* height: 500px; */
  overflow: hidden;

  position: absolute;
  top: 44px;
  bottom: 49px;
  right: 0;
  left: 0;
}

/* 是否吸顶 */
.tabControl {
  position: relative;
  z-index: 111;
}

/* .content {
  height: calc(100% - 93px);
  overflow: hidden;
} */
</style>