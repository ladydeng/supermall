export default {
    getCount(state) {
        return state.cartList.length
    },
    cartList(state) {
        return state.cartList
    }
}