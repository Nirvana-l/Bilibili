<template>
    <div>
        <van-field
        :label="label" 
        :type="type" 
        :placeholder="placeholder" 
        :rule="rule" 
        v-model="content" 
        />
    </div>
</template>

<script>
export default {
    data() {
        return{
            content:''
        }
    },
    methods:{
        judge(){
            const rue = new RegExp(this.rule)  //RegExp()  把字符串转化成正则表达式
            if(rue.test(this.content)){
                this.$emit('inputchanges',this.content)
            }
        }
    },
    props:['label','type','placeholder','rule'],
    watch:{ //对data的数据进行监听
        content(){
            this.judge()
        }
    }
}
</script>

<style>

</style>