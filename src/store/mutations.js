import {
    ADD_COUNTER, ADD_TO_CART
} from "./mutations_type"


export default {
    // mutations唯一的目的是修改state中的状态
    // mutations中的每个方法完成的事件尽可能单一一点
    [ADD_COUNTER](state, payLoad) {
        payLoad.count++
    },
    [ADD_TO_CART](state, payLoad) {
        state.cartList.push(payLoad)
    }
}