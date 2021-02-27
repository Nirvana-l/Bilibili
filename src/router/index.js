import VueRouter from 'vue-router'
import Vue from 'vue'
import register from '@/views/register.vue'
import login from '@/views/login.vue'
import home from '@/views/home.vue'
import userinfo from '@/views/userinfo.vue'
import edit from '@/views/edit.vue'
import article from '@/views/article.vue'

//1.通过Vue.use(插件) 安装插件
Vue.use(VueRouter)

//2.创建vuerouter对象
const routes = [
    {
        path:'/',
        component:home,
        meta:{
            keepalive:true
        }
    },
    {
        path:'/register',
        component:register
    },
    {
        path:'/login',
        component:login
    },
    {
        path:'/userinfo',
        component:userinfo,
        meta:{   //是否有本地token
            istoken :true
        }
    },
    {
        path:'/edit',
        component:edit,
        meta:{
            istoken :true
        }
    },
    {
        path:'/article/:id',
        component:article
    }
]

const router =new VueRouter({
    mode: 'history',
    routes
})

//前置路由
router.beforeEach((to,from,next) => {
    //验证token，否则返回登录页面
    if(!localStorage.getItem('token') && !localStorage.getItem('id') && to.meta.istoken ===true){
        router.push('/login')
        return
    }
        next()
})

//3.将route对象传入Vue实例中
export default router