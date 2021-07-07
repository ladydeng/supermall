<template>
  <div id="detail">
    <detail-nav-bar ref="nav" class="detail-nav" @titleClick="titleClick" />

    <scroll
      class="content"
      ref="wrapper"
      :pull-up-load="true"
      :probe-type="3"
      @scroll="contentClick"
    >
      <!-- 验证是否成功加入购物车 -->
      <!-- <div>{{ $store.state.cartList }}</div> -->
      <detail-swiper :topImages="topImages" />
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop" />
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad" />
      <detail-param-info ref="params" :param-info="paramInfo" />
      <detail-comment-info ref="comment" :comment-info="commentInfo" />
      <good-list ref="recommend" :goods="recommend" />
    </scroll>

    <detail-bottom-bar @addCart="addToCart" />

    <back-top @click.native="backClick" v-show="isShow" />

    <!-- <Toast message="窗口" :is-show="true"/> -->
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
import DetailParamInfo from "./childComps/DetailParamInfo";
import DetailCommentInfo from "./childComps/DetailCommentInfo";
import DetailBottomBar from "./childComps/DetailBottomBar";

import Scroll from "components/common/scroll/Scroll";
// import Toast from "components/common/toast/Toast"
import BackTop from "components/content/backTop/BackTop";
import GoodList from "components/content/goods/GoodList";

import {
  getDetail,
  getRecommend,
  Goods,
  Shop,
  GoodsParam,
} from "network/detail";

import { itemListenerMixin, backTopMixin } from "common/mixin";
import { debounce } from "common/utils";
import { mapActions } from "vuex"

export default {
  name: "Detail",
  data() {
    return {
      id: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommend: [],
      themeTopYs: [],
      getThemeTopY: null,
      currentIndex: null,
    };
  },
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,

    Scroll,
    // Toast,
    GoodList,
  },
  methods: {
    ...mapActions(["addCart"]),
    imageLoad() {
      this.$refs.wrapper.refresh();

      // 在子组件已经处理过多次发出imageLoad事件问题，这里的函数只执行一次，所以不用防抖
      // 当子组件DetailGoodsInfo的图片都加载完执行，才能获取正确的offsetTop值
      this.getThemeTopY();
    },
    contentClick(position) {
      //  1.判断backTop是否显示
      // 当鼠标下滑的位置大于1000时，回到顶部按钮显示
      // -position.y > 1000 ? this.isShow = true : this.isShow = false;
      const positionY = -position.y;
      this.isShow = positionY > 1000;

      // 2.联动效果
      let length = this.themeTopYs.length;
      for (let i = 0; i < length - 1; i++) {
        if (
          this.currentIndex != i &&
          positionY >= this.themeTopYs[i] &&
          positionY < this.themeTopYs[i + 1]
        ) {
          // if(this.currentIndex !== i && ((i < length - 1 && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1]) || (i === length - 1 && positionY >= this.themeTopYs[i]))){
          this.currentIndex = i;
          this.$refs.nav.currentIndex = this.currentIndex;
        }
      }
    },
    titleClick(index) {
      // 当导航点击时，跳到对应内容
      this.$refs.wrapper.scrollTo(0, -this.themeTopYs[index], 200);
    },
    addToCart() {
      // 1.获取购物车需要展示的信息
      const product = {};
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.newPrice;
      product.iid = this.id;

      // 2.将商品添加到购物车里
      // this.$store.commit("addCart", product);
      this.addCart(product).then(res =>{
        console.log(res)
        this.$toast.show(res)
      })
    },
  },
  mixins: [itemListenerMixin, backTopMixin],
  created() {
    //1.保存传入的id
    this.id = this.$route.params.iid;

    // 2.根据id请求详情数据
    getDetail(this.id).then((res) => {
      // 1.获取顶部轮播图片
      // console.log(res);
      const data = res.result;
      this.topImages = data.itemInfo.topImages;

      // 2.获取商品信息
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );

      // 3.获取商家信息
      this.shop = new Shop(data.shopInfo);

      // 4.获取商品详情信息
      this.detailInfo = data.detailInfo;

      // 5.获取参数信息
      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );

      // 6.获取评论信息
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0];
      }

      //7.this.$nextTick()函数的作用：根据最新数据 当本页面的Dom渲染完后调用此方法
      // this.$nextTick(() => {});
    });

    // 3.请求推荐数据
    getRecommend().then((res) => {
      this.recommend = res.data.list;
    });

    // 4.给getThemeTopY赋值(防抖)
    this.getThemeTopY = debounce(() => {
      this.themeTopYs = [];
      // 当每个组件的数据都获取到，把每个组件的offsetTop值加到themeTopYs数组
      this.themeTopYs.push(0);
      // 组件不能直接获取offsetTop，加上$el（代表所有组件里的dom元素）
      // 这里的 -44px：导航栏挡住
      this.themeTopYs.push(this.$refs.params.$el.offsetTop - 35);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop - 44);
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop - 50);
      // hack方法：给数组push一个最大值，为了方便if判断
      this.themeTopYs.push(Number.MAX_VALUE);
      // console.log(this.themeTopYs);
    });
  },
  mounted() {},
  destroyed() {
    //<keep-alive>包裹需要缓存组件
    // 页面第一次进入，钩子的触发顺序created-> mounted-> activated，
    // 退出时触发deactivated。当再次进入（前进或者后退）时，只触发activated
    // 这里没有缓存(因为App.vue里面exclude="Detail")，所以没有activated\deactivated
    // 当组件销毁的过程中，取消全局事件的监听
    this.$bus.$off("itemImageLoad", this.itemListener);
  },
};
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 9;
  background: #fff;

  height: 100vh;
}

.detail-nav {
  position: relative;
  z-index: 9;

  background: #fff;
}

.content {
  height: calc(100% - 44px);
}
</style>