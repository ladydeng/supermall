<template>
    <div id="recommend">
        <div v-for="(item,index) in recommends" :key="index" class="recommend-item">
            <a :href="item.link">
                <img :src="item.image" />
                <div>{{item.title}}</div>
            </a>
        </div>
    </div>
</template>

<script>
export default {
    name:"RecommendView",
    props: {
        recommends: {
            type:Array,
            default(){
                return[]
            }
        }
    }
}
</script>

<style scoped>
#recommend{
    display: flex;
    text-align: center;
    font-size: 12px;
    padding: 15px 0 30px;
    border-bottom: 8px solid #eee;
}
.recommend-item{
    flex: 1;
}
.recommend-item img{
    width: 70%;
    margin-bottom: 10px;
}
</style>