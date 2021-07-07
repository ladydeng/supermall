import {
    ADD_COUNTER, ADD_TO_CART, CHANGE_CHECKED
} from "./mutations_type"


export default {
    // mutations唯一的目的是修改state中的状态
    // mutations中的每个方法完成的事件尽可能单一一点
    [ADD_COUNTER](state, payLoad) {
        payLoad.count++
    },
    [ADD_TO_CART](state, payLoad) {
        // 默认选中
        payLoad.checked = true
        state.cartList.push(payLoad)
    },
    [CHANGE_CHECKED](state, payload) {
        // 遍历数组，改变每件商品的cheched值
        state.cartList.forEach(item => {
            item.checked = payload
        });
    }
}