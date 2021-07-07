<template>
  <div class="cart-list">
    <scroll class="content" ref="scroll">
      <cart-list-item
        v-for="(item, index) in cartList"
        :key="index"
        :product="item"
      />
    </scroll>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import Scroll from "components/common/scroll/Scroll";

import CartListItem from "./CartListItem";

export default {
  name: "CartList",
  components: {
    Scroll,
    CartListItem,
  },
  computed: {
    ...mapGetters(["cartList"]),
  },
  // 一进入页面就触发
  activated() {
    this.$refs.scroll.refresh()
  },
};
</script>

<style scoped>
/* 方法一 */
/* .cart-list {
  height: calc(100vh - 49px - 44px);
}

.content{
    height: 100%;
    overflow: hidden;
} */

/* 方法二 */
.content {
  position: fixed;
  top: 44px;
  left: 0;
  right: 0;
  bottom: 89px;

  overflow: hidden;
}
</style>