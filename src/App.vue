<template>
  <div>
    <!-- <register/> -->

    <!-- 保持状态，不被销毁 -->
    <keep-alive>
      <router-view v-if="$route.meta.keepalive"></router-view>
    </keep-alive>
      <router-view v-if="!$route.meta.keepalive"></router-view>
  </div>
</template>

<script>
import register from './views/register'


export default {
  name: 'app',
  components: {
    register
  }
}
</script>

<style>
body{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  background-color: #f4f4f4;
}
p{
  margin: 0;
  padding: 0;
}
</style>
