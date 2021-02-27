<template>
  <div class="article" v-if="model">
    <top-nav />
    <div>
      <div class="video">
        <video controls="controls" src="@/assets/video.mp4"></video>
        <!-- <video  controls="controls" :src="model.content"></video> -->
      </div>
      <div>
        <!-- 视频名称 -->
        <div class="videoName">
          <span>{{ model.name }}</span>
        </div>
        <!-- 视频信息  -->
        <div class="videoMsg">
          <span class="first">{{ model.userinfo.name }}</span>
          <span>1516万次观看</span>
          <span>513弹幕</span>
          <span>{{ model.date }}</span>
        </div>
        <div class="handle">
          <div @click="collectionClick">
            <img src="@/assets/collection.png" v-if="isCollection != true" alt="" />
            <img src="@/assets/collection1.png" v-else alt="" />
            <span>收藏</span>
          </div>
          <div>
            <img src="@/assets/down.png" alt="" />
            <span>缓存</span>
          </div>
          <div>
            <img src="@/assets/share.png" alt="" />
            <span>分享</span>
          </div>
        </div>
      </div>
    </div>
    <div class="detailParent">
        <cover class="detailItem" v-for="(listItem, listIndex) in commendList" :key="listIndex" :detailItem="listItem" />
    </div>

    <commenthead @postComment="postSuccess" />
    <comment />
  </div>
</template>

<script>
import topNav from "../components/common/topNav.vue";
import Comment from "../components/content/comment.vue";
import Commenthead from "../components/content/commenthead.vue";
import cover from "./cover";

export default {
  data() {
    return {
      model: null,
      commendList: null,
      postcom:{
        comment_content:'',
        comment_date:null,
        article_id:null
      },
      isCollection:false
    };
  },
  components: {
    topNav,
    cover,
    Commenthead,
    Comment,
  },
  methods: {
    //请求文章信息
    async getArticle() {
      const res = await this.$http.get("/article/" + this.$route.params.id);
      this.model = res.data[0];
      this.commendData()
    },
    //请求推荐文章信息
    async commendData() {
      const res = await this.$http.get("/commend");
      this.commendList = res.data;
    },
    //获取评论信息
    async postSuccess(res){
      const date = new Date()
      let m = date.getMonth() + 1
      let d = date.getDay()
      if(m < 10){
        m = '0' + m
      }
      if(d < 10){
        d = '0' + d
      }
      let str = `${m}-${d}`
      this.postcom.comment_content = res
      this.postcom.comment_date = str
      this.postcom.article_id = this.$route.params.id
      const result = await this.$http.post('/comment_post/' + localStorage.getItem('id'),this.postcom)
      if(result.status == 200){
        this.$msg.fail('评论成功')
      }
    },
    //收藏与取消收藏
    async collectionClick() {
      if(localStorage.getItem('token')){
        const res = await this.$http.post('/collection/' + localStorage.getItem('id'),{article_id:this.$route.params.id})
          if(res.data.msg == '取消收藏成功'){
            this.isCollection = false
          }else{
            this.isCollection = true
          }
          this.$msg.fail(res.data.msg)
      }
    },
    //进入页面获取是否收藏
    async collectionInit(){
      if(localStorage.getItem('token')){
        const res = await this.$http.get('/collection/' + localStorage.getItem('id'),{
          params:{
            article_id:this.$route.params.id
          }
        })
        this.isCollection = res.data.success
      }
    }
  },
  created() {
    this.getArticle();
    this.commendData();
    this.collectionInit()
  },
  watch:{
    $route(){
      this.getArticle();
      this.commendData();
      this.collectionInit()
    }
  }
};
</script>

<style>
.article {
  background-color: white;
}
.video {
  width: 100%;
  background-clip: red;
}
.video video {
  width: 100%;
}
.videoName {
  margin: 2.778vw 2.778vw;
  font-size: 5.556vw;
}
.videoMsg span {
  margin: 2.778vw;
  color: #aaa;
  font-size: 3.889vw;
}
.videoMsg .first {
  color: #111;
  font-size: 4.722vw;
}
.handle {
  display: flex;
  align-items: center;
}
.handle > div {
  margin: 10px 15px;
  display: flex;
  align-items: center;
}
.handle img {
  width: 30px;
  height: 30px;
}
.detailParent {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
.detailParent p {
  font-size: 3.333vw;
}
.detailItem {
  width: 45%;
  margin: 1.389vw 0;
}
</style>