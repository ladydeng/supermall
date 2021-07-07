import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import toast from "./components/common/toast/index"

import FastClick from "fastclick"
//FastClick的ios点击穿透解决方案
FastClick.prototype.focus = function (targetElement) {
  let length;
  if (targetElement.setSelectionRange && targetElement.type.indexOf('date') !== 0 && targetElement.type !== 'time' && targetElement.type !== 'month') {
    length = targetElement.value.length;
    targetElement.focus();
    targetElement.setSelectionRange(length, length);
  } else {
    targetElement.focus();
  }
};
// 解决移动端点击按钮延迟300ms
FastClick.attach(document.body)

import VueLazyload from 'vue-lazyload'
// 图片懒加载-用到时在加载----可以使用我们的按页加载图片
// 在图片需要懒加载的位置 v-lazy="imgSrc"
Vue.use(VueLazyload, {
  loading: require('./assets/images/lazyload.gif')
})


Vue.config.productionTip = false
Vue.prototype.$bus = new Vue()
Vue.use(toast)

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
