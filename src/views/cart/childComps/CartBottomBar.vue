<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button
        class="check-btn"
        :is-checked="isSelectAll"
        @click.native="selectAll"
      ></check-button>
      <span>全选</span>
    </div>

    <div class="select-all">合计：{{ totalPrice }}</div>

    <div class="pay">
      <span>去支付({{ checkLength }})</span>
    </div>
  </div>
</template>

<script>
import CheckButton from "components/content/checkButton/CheckButton";
import { mapGetters } from "vuex";

export default {
  name: "CartBottonBar",
  components: {
    CheckButton,
  },
  computed: {
    ...mapGetters(["cartList", "getCount"]),
    // 计算被选中商品的总价
    totalPrice() {
      // filter 数组过滤
      return (
        "￥" +
        this.cartList
          .filter((item) => {
            return item.checked;
            // reduce函数  把数组的值从左到右累加
          })
          .reduce((preValue, item) => {
            var price = item.price;
            var length = price.length;
            price = price.slice(1, length);
            console.log(price);
            return preValue + price * item.count;
          }, 0)
          .toFixed(2)
      );
    },

    // 获取被选中商品数量
    checkLength() {
      return this.cartList.filter((item) => item.checked).length;
    },

    // 通过判断被选中商品的数组长度改变全选按钮
    isSelectAll() {
      if (this.cartList.length == 0) return false;
      return this.checkLength == this.getCount;
    },
  },
  methods: {
    // 点击全选按钮
    selectAll() {
      this.$store.commit("changeChecked", !this.isSelectAll);
    },
  },
};
</script>

<style scoped>
.bottom-bar {
  height: 40px;
  background: #eee;

  display: flex;

  position: fixed;
  bottom: 49px;
  left: 0;
  right: 0;
}

.check-content {
  display: flex;
  align-items: center;
  flex: 1;
}

.check-btn {
  width: 18px;
  height: 18px;
  margin-left: 5px;
  margin-right: 5px;
}

.select-all {
  display: flex;
  align-items: center;
  flex: 2;
}

.pay {
  display: flex;
  align-items: center;
  flex: 1;

  position: relative;
}

.pay span {
  display: block;

  width: 100%;
  height: 100%;
  text-align: center;
  line-height: 40px;
  background: red;
  color: white;

  position: absolute;
  right: 0;
}
</style>