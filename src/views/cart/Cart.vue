<template>
  <div class="cart">
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{ count }})</div>
    </nav-bar>

    <cart-list></cart-list>

    <cart-bottom-bar />
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import CartList from "./childComps/CartList";
import CartBottomBar from "./childComps/CartBottomBar"

import { mapGetters } from "vuex";

export default {
  name: "Cart",
  components: {
    NavBar,
    CartList,
    CartBottomBar
  },
  computed: {
    // 把getters转为计算属性的两种方法
    // 1.数组形式
    // ...mapGetters(['getCount'])

    // 2.对象形式
    ...mapGetters({
      count: "getCount",
    }),
  },
};
</script>

<style scoped>
.nav-bar {
  background-color: var(--color-tint);
  color: white;
}

</style>