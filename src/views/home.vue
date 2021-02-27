<template>
  <div class="home">
    <top-nav/>
    <van-tabs v-model="value" swipeable sticky>
      <van-tab v-for="(item,index) in category" :key="index" :title="item.title">
        <!-- 滚动实现 -->
        <van-list v-model="item.loading"  :finished="item.finished"  finished-text="没有更多了" :immediate-check="false"  @load="onLoad">
          <div class="detailParent">
            <cover class="detailItem" :detailItem="categoryItem" v-for="(categoryItem,categoryIndex) in item.list" :key="categoryIndex" />
          </div>
        </van-list>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import topNav from "../components/common/topNav.vue"
import cover from './cover.vue'

export default {
  data() {
    return {
      category:[],
      value:0
    }
  },
  components: { 
    topNav,
    cover
  },
  methods:{
    //获取分类信息
    async selectCategory(){
      const res = await this.$http.get('/category')
      //在category中添加存储数组，页数，每页多少个
      res.data.map( item => {
        item.list = []
        item.page = 0
        item.pagesize = 10
        item.finished = false
        item.loading = false
        return item
      })
      this.category = res.data 
      this.getCategory()
    },
    async getCategory() {
      const categoryitem = this.categoryItem()
      const res = await this.$http.get('/detail/' + categoryitem._id,{
          params:{
            page:categoryitem.page,
            pagesize:categoryitem.pagesize
          }
      })
      categoryitem.list.push(...res.data)
      categoryitem.loading = false
      if(res.data.length < categoryitem.pagesize){
        categoryitem.finished = true
      }
    },
    categoryItem() {
      const categoryitem = this.category[this.value]
      return categoryitem
    },
    //加载
    onLoad() {
      const categoryitem = this.categoryItem()
        setTimeout(() => {
          categoryitem.page += 1
          this.getCategory()
        }, 1000);
    }
  },
  watch:{
    value() {
      this.getCategory()
    }
  },
  created() {
    this.selectCategory()
  }
}
</script>

<style>
.home{
  background-color: white;
}
.detailParent{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
.detailParent p{
  font-size: 3.333vw;
}
.detailItem{
  width: 45%;
  margin: 1.389vw 0;
}

</style>