<template>
  <div @click="editClick">
      <div class="userEdit">
              <span>{{left}}</span>
              <span><slot name="right" /></span>
      </div>
     
  </div>
</template>

<script>
export default {
    props:['left'],
    methods:{
        editClick(){
            this.$emit('editClick')
        }
    }
}
</script>

<style>
.userEdit{
    padding: 4.167vw;
    background-color: white;
    border-bottom: 1px solid #eee;
    font-size: 4.167vw;
    display: flex;
    justify-content:space-between;
    align-items: center;
}

</style>