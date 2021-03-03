<template>
  <div class="tab-bar-item" @click="itemClick">
    <div v-if="!isActive"><slot name="item-icon"></slot></div>
    <div v-else><slot name="item-icon-active"></slot></div>
    <div :style="activeStyle"><slot name="item-text"></slot></div>
  </div>
</template>

<script>
export default {
  name: "TabBarItem",
  props:{
    path:String,
    activeColor:{
       type:String,
       default:'blue'
    }
  },
  data (){
    return {
      // isActive:false
    }
  },
  computed:{
    isActive(){
      // 判断this.$route.path是否存在this.path
      return this.$route.path.indexOf(this.path) !== -1
    },
    activeStyle(){
       return this.isActive ? {color:this.activeColor} : {}
    }  
  },
  methods:{
    itemClick(){
      // this.$router.replace(this.path)
      // 解决多次点击同一个路由报错push
      this.$router.push(this.path)
    }
  }
};
</script>

<style scoped>
/* 子组件的import不能用@，会报错 */
.tab-bar-item {
  flex: 1;
  text-align: center;
  height: 49px;
}
.tab-bar-item img {
  width: 24px;
  height: 24px;
  /* 图片下面默认有3个像素，vertical-align:middle;能把这三个像素去掉 */
  vertical-align: middle;
}
.tab-bar-item p {
  margin: 0;
}
/* .active{
  color: red;
} */
</style>
