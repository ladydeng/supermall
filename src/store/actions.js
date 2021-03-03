import {
    ADD_COUNTER, ADD_TO_CART
} from "./mutations_type"

import { ADD_CART } from "./actions_type"

export default {
    // actions用于异步操作或者有判断逻辑的操作
    [ADD_CART](context, payLoad) {
        // payLoad是新添加的商品
        // 1.查找之前数组中是否有该商品
        let oldProduct = context.state.cartList.find(item => item.iid === payLoad.iid)

        // 2.判断oldProduct
        if (oldProduct) {
            // oldProduct.count += 1
            context.commit(ADD_COUNTER, oldProduct)
        } else {
            payLoad.count = 1
            // context.state.cartList.push(payLoad)
            context.commit(ADD_TO_CART, payLoad)
        }

    }
}