<template>
    <div>
        <top-nav></top-nav>
        <img class="bgcImg" src="@/assets/bannerTop_new.png" alt="">
        <user-detail :userinfo="model" />
    </div>
</template>

<script>
import topNav from '@/components/common/topNav'
import userDetail from '@/components/content/userDetail'



export default {
    data(){
        return{
            model:{ }
        }
    },
    components:{
        topNav,
        userDetail
    },
    methods:{
        //根据token获取注册数据返回到model
        async userinfoData(){
            const res = await this.$http.get('/user/' + localStorage.getItem('id'),{
                headers:{
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            })
            this.model =res.data[0]
        },
    },
    created(){
        this.userinfoData()
    }
}
</script>

<style>
.bgcImg{
    width: 100%;
    height: 100px;
}
</style>