import {
    ADD_COUNTER, ADD_TO_CART
} from "./mutations_type"

import { ADD_CART, CHECKED_CHANGE } from "./actions_type"

export default {
    // actions用于异步操作或者有判断逻辑的操作
    [ADD_CART](context, payLoad) {
        return new Promise((resolve, reject) => {
            // payLoad是新添加的商品
            // 1.查找之前数组中是否有该商品
            let oldProduct = context.state.cartList.find(item => item.iid === payLoad.iid)

            // 2.判断oldProduct
            if (oldProduct) {
                // oldProduct.count += 1
                context.commit(ADD_COUNTER, oldProduct)
                resolve("商品数量+1")
            } else {
                payLoad.count = 1
                // context.state.cartList.push(payLoad)
                context.commit(ADD_TO_CART, payLoad)
                resolve("成功添加购物车")
            }
        })
    },
    [CHECKED_CHANGE]({ state }, payLoad) {
        // 循环cartList中的每一个product
        for (var i in state.cartList) {
            // 在cartList中找到点击的product，修改该product对应的checked
            if (state.cartList[i].iid == payLoad.iid) {
                state.cartList[i].checked = !payLoad.checked
            }
        }
        // console.log(state.cartList[i].checked)
    }
}