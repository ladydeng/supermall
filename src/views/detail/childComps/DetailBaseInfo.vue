<template>
  <div v-if="Object.keys(goods).length !== 0" class="base-info">
    <div class="info-title">{{ goods.title }}</div>
    <div class="info-price">
        <span class="n-price">{{ goods.newPrice }}</span>
        <span class="o-price">{{ goods.oldPrice }}</span>
        <span v-if="goods.discount" class="discount">{{ goods.discount }}</span>
    </div>
    <div class="info-other">
        <span>{{ goods.columns[0] }}</span>
        <span>{{ goods.columns[1] }}</span>
        <span>{{ goods.services[goods.services.length-1].name }}</span>
    </div>
    <div class="info-service">
        <span class="info-service-item" v-for="index in goods.services.length-1" :key="index">
            <img :src="goods.services[index-1].icon">
            <span>{{ goods.services[index-1].name }}</span>
        </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailBaseInfo",
  props: {
    goods: {
      type: Object,
      default() {
        return {};
      },
    },
  },
};
</script>

<style scoped>
.base-info{
    margin-top: 15px;
    padding: 0 8px;
    color: #999;
    border-bottom: 5px solid #f2f5f8;
}

.info-title{
    color: #222;
    font-size: 18px;
    font-weight: bold;
}

.info-price{
    margin-top: 10px;
}

.info-price .n-price{
    font-size: 24px;
    color: var(--color-high-text);
}

.info-price .o-price{
    font-size: 13px;
    margin-left: 5px;
    text-decoration: line-through;
}

.discount{
    background: var(--color-high-text);
    color: white;
    border-radius: 5px;
    padding: 4px;
    font-size: 10px;
    position: relative;
    top: -12px;
}

.info-other{
    display: flex;
    text-align: center;
    line-height: 50px;
    border-bottom: 1px solid #f2f5f8;
}

.info-other span{
    flex: 1;
}

.info-other span:first-child{
    text-align: left;
}

.info-other span:last-child{
    text-align: right;
}

.info-service{
    display: flex;
    text-align: center;
    line-height: 50px;
    font-weight: bold;
    color: black;
}

.info-service-item{
    flex: 1;
}

.info-service .info-service-item:first-child{
    text-align: left;
}

.info-service .info-service-item:last-child{
    text-align: right;
}

.info-service img{
    width: 14px;
    vertical-align: middle;
    margin-right: 4px;
}

</style>