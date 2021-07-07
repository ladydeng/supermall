<template>
  <div class="cart-list-item">
    <div class="item-selector">
      <CheckButton
        @click.native="checkedChange"
        :is-checked = "product.checked"
      ></CheckButton>
    </div>

    <div class="item-img">
      <img :src="product.image" alt="商品图片" />
    </div>

    <div class="item-info">
      <div class="item-title">{{ product.title }}</div>
      <div class="item-desc">{{ product.desc }}</div>
      <div class="info-bottom">
        <div class="item-price left">{{ product.price }}</div>
        <div class="item-count right">x{{ product.count }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import CheckButton from "components/content/checkButton/CheckButton";

export default {
  name: "CartListItem",
  components: {
    CheckButton,
  },
  props: {
    product: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  methods: {
    checkedChange() {
      // this.product.checked = !this.product.checked

      // 把点击的product传给checkedChange
      this.$store.dispatch("checkedChange",this.product)
    },
  },
};
</script>

<style scoped>
.cart-list-item {
  width: 100%;
  display: flex;
  font-size: 0;
  padding: 5px;
  border-bottom: 1px solid #ccc;
}

.item-selector {
  width: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.item-title,
.item-desc {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  align-items: center;
}

.item-img {
  padding: 5px;
}

.item-img img {
  width: 80px;
  height: 100px;
  display: block;
  border-radius: 5px;
}

.item-info {
  font-size: 17px;
  color: #333;
  padding: 5px 10px;
  position: relative;
  overflow: hidden;
}

.item-info .item-desc {
  font-size: 14px;
  color: #666;
  margin-top: 15px;
}

.info-bottom {
  margin-top: 15px;
  position: absolute;
  bottom: 10px;
  left: 10px;
  right: 10px;
}

.info-bottom .item-price {
  color: orangered;
}

.info-bottom .right,
.info-bottom .left {
  display: inline-block;
}

.info-bottom .right {
  float: right;
}
</style>