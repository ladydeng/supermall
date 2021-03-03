<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";

export default {
  name: "Scroll",
  data() {
    return {
      scroll: null,
    };
  },
  props: {
    // 根据传过来的值看需不需要实时监听滚动位置
    probeType: {
      type: Number,
      default: 0,
    },
    pullUpLoad: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    // 让页面在time时间回到x,y位置
    scrollTo(x, y, time = 300) {
      this.scroll && this.scroll.scrollTo(x, y, time);
    },

    // 让页面在两秒后才能继续上拉加载更多
    finishPullUp() {
      setTimeout(() => {
        this.scroll.finishPullUp();
      }, 2000);
    },

    // 刷新srcollerHeight
    refresh() {
      // 先判断scroll对象是否已被创建
      this.scroll && this.scroll.refresh();
    },
  },
  mounted() {
    this.scroll = new BScroll(this.$refs.wrapper, {
      // 加上这个wrapper里面组件的点击事件才可以有效
      click: true,
      probetype: this.probeType,
      pullUpLoad: this.pullUpLoad,
    });

    // 监听滚动位置
    if (this.probeType === 2 || this.probeType === 3) {
      this.scroll.on("scroll", (position) => {
        this.$emit("scroll", position);
        // console.log(this.scroll.scrollerHeight)
      });
    }

    // 监听滚动到底部
    if (this.pullUpLoad) {
      this.scroll.on("pullingUp", () => {
        this.$emit("pullingup");
      });
    }
  },
};
</script>




<style scoped>
</style>