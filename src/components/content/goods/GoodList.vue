<template>
    <div id="goods">
        <goods-list-item v-for="(item,index) in goods" :goodsItem="item" :key="index"/>
    </div>
</template>

<script>
import GoodsListItem from "components/content/goods/GoodsListItem"

export default {
    name:"GoodsList",
    components:{
        GoodsListItem
    },
    props: {
        goods: {
            type:Array,
            default(){
                return []
            }
        }
    },
}
</script>

<style scoped>
#goods{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;

    padding: 2px;
}
</style>