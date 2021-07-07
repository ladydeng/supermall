import Toast from "./Toast"
const obj = {}

// 默认传过来的参数vues
obj.install = function (Vue) {
    console.log("执行了obj的install函数")

    // 1.创建组件构造器
    const toastContrustor = Vue.extend(Toast)

    // 2.使用new关键字，根据组件构造器，创建一个组件对象
    const toast = new toastContrustor()

    // 3.将组件对象，手动挂载到某一元素上
    toast.$mount(document.createElement("div"))

    // 4.toast.$el对应的就是div
    document.body.appendChild(toast.$el)

    Vue.prototype.$toast = toast

}

export default obj