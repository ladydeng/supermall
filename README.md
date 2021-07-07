# supermall

## 项目结构
```
src文件夹下：
assets 静态资源文件
      -css
      -images
common 公共资源，如防抖，混入
components 项目组件
      -content 项目组件
      -common 可以重复利用的组件
network 网络请求
      -request.js 封装好的网络请求
      -home.js 首页的网络请求
      -detail.js 详情页的网络请求
router 路由文件
      -index.js
store 公共状态文件
      -index.js
      -getters.js getters的一些函数
      -getters_type.js getters中函数的常量名
      -mutations.js mutaions的一些函数
      -mutations_type.js mutations中函数的常量名
      -actions.js actions的一些函数
      -actions_type.js actions中函数的常量名
views 项目页面
      -home
        -Home.vue 首页
        -childCompos 首页的子组件
      -category
        -Category.vue 分类页
        -childCompos 分类页的子组件
      -cart
        -Cart.vue 购物车页
        -childCompos 购物车页的子组件
      -profile
        -Profile.vue 我的页
        -childCompos 我的页的子组件
App.vue  vue项目根组件
main.js  vue项目入口js文件
```

## 项目使用到的技术
```
vue-router、 axios、 vuex 、better_scroll（滚动；）、 防抖、 混入 、事件总线、fastclick解决移动端点击按钮延迟300ms、lazyload图片懒加载
```