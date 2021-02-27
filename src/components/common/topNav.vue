<template>
  <div class="topNav">
    <div class="logo" @click="$router.push('/')">
      <img src="@/assets/bilibili.png" alt="" />
    </div>
    <div class="search">
      <p>
        <van-icon name="search" class="search-icon" />
        请输入搜索
      </p>
    </div>
    <div class="down">
      <img :src="imgUrl" alt="" @click="$router.push('/userinfo')" v-if="imgUrl" />
      <img src="@/assets/1.png" alt="" @click="$router.push('/login')" v-else />
      <p>下载App</p>
    </div>
  </div>
</template>

<script>
export default {
  data(){
      return{
          imgUrl:{}
      }
  },
  methods: {
    //如果本地有token，则请求用户数据
    async mounted() {
      if (localStorage.getItem("token")) {
        const res = await this.$http.get('/user/' + localStorage.getItem("id"));
        this.imgUrl = res.data[0].user_img;
      }
    },
  },
  created(){
      this.mounted()
  }
};
</script>

<style>
.topNav {
  height: 12.5vw;
  background-color: #fff;
  display: flex;
  align-items: center;
}
.logo {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 110px;
}
.logo img {
  width: 80%;
}
.search {
  flex: 1;
  display: flex;
  align-items: center;
}
.search p {
  background-color: #f4f4f4;
  height: 26px;
  width: 100%;
  border-radius: 30px;
  position: relative;
  padding-left: 30px;
}
.search-icon {
  position: absolute;
  left: 10px;
  top: 20%;
}
.down {
  display: flex;
  justify-content: center;
  align-items: center;
}
.down img {
  width: 6.667vw;
  height: 6.667vw;
  padding: 0 5px;
  border-radius: 50%;
}
.down p {
  padding: 5px 10px;
  margin: 0 8px;
  background-color: #fb7299;
  color: white;
  border-radius: 3px;
  font-size: 15px;
}
</style>