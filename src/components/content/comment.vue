<template>
  <div class="commentParent">
      <div class="commentItem" v-for="(item,index) in commentList" :key="index">
          <div class="commentImg" v-if="item.userinfo"><img :src="item.userinfo.user_img" alt=""></div>
          <div class="commentContent">
              <p>
                  <span>{{item.userinfo.name}}</span>
                  <span>{{item.comment_date}}</span>
              </p>
              <div>
                  {{item.comment_content}}
              </div>
          </div>
      </div>
  </div>
</template>

<script>
export default {
    data(){
        return {
            commentList:{}
        }
    },
    methods:{
        //请求后端评论信息并接收
        async commentData() {
            const res = await this.$http.get('/comment/' + this.$route.params.id)
                this.commentList = res.data
        }
    },
    created(){
        this.commentData()
    }
}
</script>

<style>
.commentItem{
    display: flex;
    border-bottom: 1px solid #e7e7e7;
    padding: 3.2vw;
}
.commentImg img{
    width: 9.722vw;
    height: 9.722vw;
    margin: 2.778vw 5.556vw;
    border-radius: 50%;
}
.commentContent{
    flex: 1;
    padding-right: 5.556vw ;
}
.commentContent p{
    display: flex;
    justify-content: space-between;
    color: #555;
    padding-bottom: 2.778vw;
}
</style>