<template>
  <div class="loginTop">
    <div></div>
    <div>{{middleTop}}</div>
    <slot name="right">{{aa}}</slot>
  </div>
  
</template>

<script>
export default {
    name:'loginTop',
    props:['middleTop','aa']
}
</script>

<style>
.loginTop{
  height: 45px;
  background-color: white;
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-size: 16px;
}
</style>