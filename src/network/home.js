import {request} from "./request"
import {newRequest} from "./newRequest"

export function getHomeMultidata(){
    return request({
        url:'/home/multidata'
    })
}

export function getHomeGoods(type,page){
    return newRequest({
        url:'/home/data',
        params: {
            type,
            page
        }
    })
}