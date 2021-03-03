<template>
  <div class="shop-info">
    <div class="shop-top">
      <img :src="shop.logo" alt="" />
      <span class="title">{{ shop.name }}</span>
    </div>

    <div class="shop-middle">
      <div class="shop-middle-item shop-middle-left">
        <div class="info-sells">
          <div class="sells-count">
            {{ shop.sells | sellCountFilter("万") }}
          </div>
          <div class="sells-text">总销量</div>
        </div>
        <div class="info-goods">
          <div class="goods-count">
            {{ shop.goodsCount }}
          </div>
          <div class="goods-text">全部宝贝</div>
        </div>
      </div>
      <div class="shop-middle-item shop-middle-right">
        <table>
          <tr v-for="(item, index) in shop.score" :key="index">
            <td>{{ item.name }}</td>
            <td class="score" :class="{ 'score-better': item.isBetter }">
              {{ item.score }}
            </td>
            <td class="better" :class="{ 'better-more': item.isBetter }">
              <span>{{ item.isBetter ? "高" : "低" }}</span>
            </td>
          </tr>
        </table>
      </div>
    </div>
    <div class="shop-bottom">
      <div class="enter-shop">进店逛逛</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailShopInfo",
  props: {
    shop: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  filters: {
    sellCountFilter(val, str) {
      return (val / 10000).toFixed(2) + str;
    },
  },
};
</script>

<style scoped>
.shop-top {
  line-height: 100px;
}

.shop-top img {
  width: 60px;
  border-radius: 50%;
  vertical-align: middle;
  margin-left: 10px;
}

.shop-top .title {
  font-size: 18px;
  margin-left: 10px;
}

.shop-middle {
  display: flex;
  text-align: center;
  margin-top: 10px;
  margin-bottom: 10px;
}

.shop-middle-left {
  flex: 1;
  display: flex;
}

.info-goods {
  border-right: 1px solid black;
}

.sells-count,
.goods-count {
  font-size: 20px;
  font-weight: bold;
}

.sells-text,
.goods-text {
  margin-top: 10px;
}

.info-sells,
.info-goods {
  flex: 1;
  padding-top: 20px;
}

.shop-middle-right {
  flex: 1;
}

.shop-middle-right table {
  width: 100%;
  text-align: center;
}

.shop-middle-right table tr {
  height: 30px;
}

.score {
  color: rgb(110, 175, 12);
}

.better span {
  background: rgb(110, 175, 12);
  color: white;
}

.score-better {
  color: coral;
}

.better-more span {
  background: coral;
  color: white;
}

.enter-shop {
  width: 120px;
  height: 30px;
  color: white;
  background: rgb(174, 200, 247);
  margin: 0 auto;
  text-align: center;
  line-height: 30px;
  border-radius: 5px;
  margin-top: 30px;
  margin-bottom: 40px;
}
</style>