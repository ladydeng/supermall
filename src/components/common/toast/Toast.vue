<template>
  <div class="toast" v-show="isShow">
    <div class="text">{{ message }}</div>
  </div>
</template>

<script>
export default {
  name: "Toast",
  data(){
    return {
      message:"",
      isShow:false
    }
  },
  methods:{
    show(message,time=1500){
      this.isShow = true
      this.message = message
      console.log("show函数执行了")

      setTimeout(()=>{
        this.isShow = false
      },time)
    }
  }
  // props: {
  //   message: {
  //     type: String,
  //     default: "",
  //   },
  //   isShow: {
  //     type: Boolean,
  //     default: false,
  //   },
  // },
};
</script>

<style scoped>
.text {
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 10px;

  position: fixed;
  top: 50%;
  left: 50%;
  /* 根据自身宽高偏移居中 */
  transform: translate(-50%, -50%);

  z-index: 999;
}

/* v-show过渡动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>