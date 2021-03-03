import axios from 'axios'

export function request(config) {
    // 1.创建axios实例
    const instance = axios.create({
        baseURL: 'http://123.207.32.32:8000',
        timeout: 5000
    })

    //2.axios的拦截器
    //2.1请求拦截的作用
    instance.interceptors.request.use(config=>{
       //1.比如config中的一些信息不符合服务器要求

       //2.比如每次发送网络请求时，都希望在界面中显示一个请求的图标

       //3.某些网络请求（比如登录token）必须携带一些特殊信息

       //4.对请求的url进行进一步的封装，防止恶意攻击

        return config
    },err=>{
        console.log(err)
    })

    //2.1响应拦截
    instance.interceptors.response.use(res=>{
        //处理完之后，把拦截的结果返回出去
        // console.log(res.data)
        return res.data
    },err=>{
        console.log(err);
    })

    //3.发送真正的网络请求
    return instance(config)
}


