<template>
  <div>
    <loginTop middleTop="注册账户">
      <div slot="right" @click="$router.push('/login')">登录</div>
    </loginTop>
    <loginText
      label="昵称"
      style="margin: 15px 0"
      placeholder="请输入昵称"
      rule="^.{6,16}$"
      @inputchanges="(res) => (model.name = res)"
    />
    <loginText
      label="账号"
      placeholder="请输入账号"
      rule="^.{6,16}$"
      @inputchanges="(res) => (model.username = res)"
    />
    <loginText
      label="密码"
      type="password"
      placeholder="请输入密码"
      rule="^.{6,16}$"
      @inputchanges="(res) => (model.password = res)"
    />

    <login-btn btnText="注册" @registClick="registClick" />
  </div>
</template>

<script>
import loginTop from "../components/common/loginTop";
import loginText from "../components/common/loginText";
import LoginBtn from "../components/common/loginBtn.vue";

export default {
  data() {
    return {
      model: {
        name: "",
        username: "",
        password: "",
      },
    };
  },
  components: {
    loginTop,
    loginText,
    LoginBtn,
  },
  methods: {
    //判断注册信息是否符合规则，并提示注册状态
    registClick() {
      let rulg = /^.{6,16}$/;
      //判断是否符合正则表达式
      if (rulg.test(this.model.name) && rulg.test(this.model.username) && rulg.test(this.model.password)
      ) {
        //发送注册请求
        this.$http.post("/register", this.model).then((res) => {
          this.$msg.fail(res.data.msg);
          localStorage.setItem('id', res.data.id); //将数据存储在本地
          localStorage.setItem('token', res.data.objtoken);
          //注册成功后跳转到个人中心页面
          setTimeout(() => {
            if(res.data.code == 200){
            this.$router.push("/userinfo");
            }
          }, 1000);
        });
      } else {
        this.$msg.fail("注册失败，格式不正确");
      }
    },
  },
};
</script>

<style>
</style>