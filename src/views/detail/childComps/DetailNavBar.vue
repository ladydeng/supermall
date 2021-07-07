<template>
  <div id="navbar">
    <nav-bar>
      <div slot="left" class="back" @click="backClick">
        <img src="~assets/images/fanhui.png" alt="">
      </div>
      <div slot="center" class="title">
        <div v-for="(item, index) in titles" :key="index"
         class="item" 
         :class="{active:index===currentIndex}"
         @click="titleClick(index)">
          <span>{{ item }}</span>
        </div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
export default {
  name: "DetailNavBar",
  data() {
    return {
      titles: ["商品", "参数", "评论", "推荐"],
      currentIndex: 0,
    };
  },
  components: {
    NavBar,
  },
  methods:{
    // 菜单点击
    titleClick(index){
      this.currentIndex = index

      // 发出事件
      this.$emit("titleClick",index)
    },

    // 点击按钮返回首页
    backClick(){
      this.$router.back()
    }
  }
};
</script>

<style scoped>
.title {
  display: flex;
  font-size: 13px;
}
.item {
  flex: 1;
}
.active{
    color: var(--color-high-text);
}
.back img{
  width: 60px;
  height: 44px;
}
</style>