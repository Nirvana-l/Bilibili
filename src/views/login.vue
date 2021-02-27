<template>
  <div>
    <loginTop middleTop="登录账户">
      <div slot="right" @click="$router.push('/register')">注册</div>
    </loginTop>
    <loginText
      label="账号"
      style="margin: 15px 0"
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

    <login-btn btnText="登录" @registClick="loginClick" />
  </div>
</template>

<script>
import loginTop from "@/components/common/loginTop";
import loginText from "@/components/common/loginText";
import LoginBtn from "@/components/common/loginBtn.vue";

export default {
  data() {
    return {
      model: {
        name:'',
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
    //判断id，token是否存在，并提示登录状态
    loginClick() {
      if (this.model.username && this.model.password) {
        this.$http.post("/login", this.model).then((res) => {
          this.$msg.fail(res.data.msg);
          localStorage.setItem('id', res.data.id); 
          localStorage.setItem('token', res.data.token);
          setTimeout(() => {
            if (res.data.code == 200) {
              this.$router.push('/userinfo');
            }
          }, 1000);
        });
      } else {
        this.$msg.fail("登录失败，格式不正确");
      }
    },
  },
};
</script>

<style>
</style>