<template>
  <div style="background-color: white;">
    <div class="userDetail">
      <div>
        <img class="userImg" :src="userinfo.user_img" alt="" />
        <!-- <img class="userImg" src="@/assets/2.png" alt="" /> -->
        <div class="user">
          <div class="userMsg">
            <p>
              <span>0</span>
              <span class="userText">粉丝</span>
            </p>
            <p>
              <span>0</span>
              <span class="userText">关注</span>
            </p>
            <p>
              <span>0</span>
              <span class="userText">获赞</span>
            </p>
          </div>
          <div class="edit" @click="$router.push('/edit')">编辑资料</div>
        </div>
      </div>
    </div>
    <div class="msg">
      <h2>{{userinfo.name}}</h2>
      <div>emmmmmmmmmmmmmmmmmmmmmmmm.....</div>
    </div>
  </div>
</template>

<script>
export default {
  props:['userinfo']
  };
</script>
  
<style>

.userDetail > div {
  display: flex;
}
.userImg {
  width: 22.4vw;
  height: 22.4vw;
  margin: 2.778vw 2.778vw;
}
.user {
  flex: 1;
}
.userMsg {
  display: flex;
}
.userMsg p {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 10px 0;
}
.edit {
  height: 8.333vw;
  border: 1px solid #FC8899;
  color: #FC8899;
  padding: 0.833vw;
  margin: 5.556vw;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
}
.msg {
    margin: 10px;
}
</style>