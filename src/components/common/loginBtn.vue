<template>
    <div class="loginBtn" @click="btnClick">
      <div class="btn">{{btnText}}</div>
    </div>
</template>

<script>
export default {
    props:['btnText'],
    methods:{
        btnClick(){
            this.$emit('registClick')
        }
    }
}
</script>

<style>
.loginBtn{
    padding: 4.167vw 2.178vw;
}
.btn{
    height: 12.5vw;
    background-color: #ff9db5;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 4.444vw;
    border-radius: 20px;
}
</style>