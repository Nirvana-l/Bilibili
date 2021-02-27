<template>
  <div @click="$router.push(`/article/${detailItem.id}`)"  v-if="detailItem">
      <!-- <img :src="detailItem.img" alt=""style="width:100%"> -->
      <img src="https://i1.hdslb.com/bfs/archive/57dc19e400ce29c5f4505b264818db5e77178654.jpg@480w_270h_1c" alt="" style="width:100%">
      <p>{{detailItem.name}}</p> 
  </div>
</template>

<script>
export default {
    props:['detailItem']
}
</script>

<style>

</style>