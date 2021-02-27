<template>
  <div class="commenthead" >
      <p class="comment-title">
          <span>评论</span>
          <span>(195)</span>
      </p>
      <div class="comment-img">
        <img :src="myuser.user_img" alt="" v-if="myuser">
        <img src="@/assets/1.png" v-else alt="">
        <input v-model="comcontent" type="text" placeholder="说点什么吧....">
        <button @click="commentPublish">发表</button>
      </div>
  </div>
</template>

<script>

export default {
    data(){
        return{
            myuser:null,
            comcontent:''
        }
    },
    methods:{
        //请求用户数据
        async myInfo(){
            const res = await this.$http.get('/user/' + localStorage.getItem('id'))
            this.myuser = res.data[0]
        },
        //判断用户是否登录
        commentPublish(){
            if(!this.myuser && !localStorage.getItem('token') && !localStorage.getItem('id')){
                this.$msg.fail('请先登录')
                this.$router.push('/login') 
                return
            }
            //发送事件postComment并传递参数
            this.$emit('postComment',this.comcontent)
        }
    },
    created(){
        if(localStorage.getItem('token')){
            this.myInfo()
            // this.commentPublish()
        }
    }
}
</script>

<style>
.commenthead{
    padding: 8.333vw 2.778vw 0 5.556vw;
}
.comment-title span:nth-child(2){
    color: #aaa;
    margin-left: 2.778vw;
}
.comment-img{
    padding: 4.167vw 0;
    display: flex;
    align-items: center;
}
.comment-img img{
    width: 12.5vw;
    height: 12.5vw;
    border-radius: 50%;
}
.comment-img input{
    outline: none;
    border: 0;
    background-color: #f4f4f4;
    height: 8.333vw;
    margin-left: 4.167vw;
    border-radius: 3.611vw;
    padding: 0 15px;
}
.comment-img button{
    outline: none;
    border: 0;
    height: 8.333vw;
    border-radius: 3.333vw;
    background-color: #fb7299;
    color: white;
    font-size: 4.444vw;
    margin-left: 2.778vw;
}
</style>