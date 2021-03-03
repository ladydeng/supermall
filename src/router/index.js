import vue from 'vue'
import vueRouter from 'vue-router'

//1.安装插件
vue.use(vueRouter)

//路由懒加载-用到时才加载
const Home = () => import('../views/home/Home')
const Category = () => import('../views/category/Category')
const Cart = () => import('../views/cart/Cart')
const Profile = () => import('../views/profile/Profile')
const Detail = () => import('../views/detail/Detail')

//2.创建路由d对象
const routes = [
    {
        path:'',
        redirect:'/home',
    },
    {
        path:'/home',
        component:Home
    },
    {
        path:'/category',
        component:Category
    },
    {
        path:'/cart',
        component:Cart
    },
    {
        path:'/profile',
        component:Profile
    },
    {
        path:'/detail/:iid',
        component:Detail
    }
]

//2.创建路由对象
const router = new vueRouter({
    routes,
    //去除url中的#
    mode:'history'
})

//3.导出路由对象
export default router