<template>
    <div class="backTop">
        <img src="~assets/images/top.png" alt="返回顶部">
    </div>
</template>

<script>
export default {
    name:"BackTop"
}
</script>

<style scoped>
.backTop{
    position: fixed;
    bottom: 60px;
    right: 10px;

    z-index: 111;
}

.backTop img{
    width: 60px;
    height: 60px;
}
</style>