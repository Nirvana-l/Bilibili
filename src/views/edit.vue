<template>
  <div v-if="model">
    <div style="margin-bottom: 10px">
      <top-nav>
        <img :src="model.user_img" slot="topImg" v-if="model.user_img" alt="" />
        <img src="@/assets/1.png" slot="topImg" v-else alt="" />
      </top-nav>
      </div>
    <div class="upload">
      <van-uploader :after-read="afterRead" preview-size="100vw" class="load" />
      <user-edit left="头像">
        <img :src="model.user_img" slot="right" v-if="model.user_img" alt="" />
        <img src="@/assets/1.png" slot="right" v-else alt="" />
      </user-edit>
    </div>
    <user-edit left="昵称" @editClick="show = true">
      <a href="javascript:;" slot="right">{{ this.model.name }}</a>
    </user-edit>
    <user-edit left="账户">
      <a href="javascript:;" slot="right">{{ this.model.username }}</a>
    </user-edit>
    <user-edit left="性别" @editClick="sexshow = true">
      <a href="javascript:;" slot="right">{{ this.model.gender ? '男' : '女' }}</a>
    </user-edit>
    <user-edit left="个性签名" @editClick="textshow = true">
      <a href="javascript:;" slot="right">{{ this.model.user_desc }}</a>
    </user-edit>

    <div class="back" @click="$router.back()">返回空间</div>

    <van-dialog
      v-model="show"
      title="昵称"
      show-cancel-button
      @confirm="nameClick"
    >
      <van-field v-model="content" autofocus />
    </van-dialog>

    <van-dialog v-model="textshow" title="个性签名" show-cancel-button  @confirm="confirmClick" >
      <van-field v-model="content" autofocus />
    </van-dialog>

    <van-action-sheet v-model="sexshow" :actions="actions" cancel-text="取消" @select="onSelect" />

  </div>
</template>

<script>
import topNav from "../components/common/topNav.vue";
import UserEdit from "../components/content/userEdit.vue";
export default {
  data() {
    return {
      model: {},
      show: false,
      textshow: false,
      sexshow:false,
      content: "",
      actions:[
            {name:'男',val:1},
            {name:'女',val:0}
        ]
    }
  },
  components: {
    topNav,
    UserEdit,
  },
  methods: {
    //根据token获取注册数据返回到model
    async editData() {
      const res = await this.$http.get("/user/" + localStorage.getItem("id"));
      this.model = res.data[0];
      //   console.log(this.model)
    },
    //将文件上传至服务器
    async afterRead(file) {
      const formdata = new FormData();
      formdata.append("file", file.file);
      //上传图片并修改
      const res = await this.$http.post("/upload", formdata);
      this.model.user_img = res.data.url;
      this.userUpdate();
    },
    //更新后端头像数据
    async userUpdate() {
      const res = await this.$http.post("/update/" + localStorage.getItem("id"),this.model)
      if(res.data.code == 200){
            this.$msg.fail('修改成功')
        }
    },
    //修改name
    nameClick() {
      this.model.name = this.content;
      this.userUpdate();
      this.content = "";
    },
    //修改个性签名
    confirmClick() {
      this.model.user_desc = this.content;
      this.userUpdate();
      this.content = "";
    },
    //修改性别
    onSelect(data){
        this.model.gender = data.val
        this.userUpdate();
        this.sexshow = false
    }
  },
  created() {
    this.editData();
  },
};
</script>

<style>
a {
  color: #333;
}
.upload img {
  width: 46px;
  height: 46px;
  border-radius: 50%;
}
.upload {
  position: relative;
  overflow: hidden;
}
.load {
  position: absolute;
  opacity: 0;
}
.back{
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #999;
  font-size: 18px;
  padding: 15px 0;
  margin-top: 15px;
}
</style>