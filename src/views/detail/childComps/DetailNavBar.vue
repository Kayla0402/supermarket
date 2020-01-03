<template>
  <div class="detail">
    <nav-bar>
      <div slot="left" class="left" @click="backClick">
        <img src="@/assets/img/common/back.svg">
      </div>
      <div slot="center" class="center">
        <div class="title" v-for="(item,index) in titles"
             :class="{active:index===currentIndex}"
             @click="titleClick(index)"
        >
          {{item}}
        </div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
  import NavBar from '@/components/common/navBar/NavBar'

  export default {
      components:{
        NavBar
      },
      data(){
        return {
          titles:['商品','参数','评论','推荐'],
          currentIndex:0
        }
      },
      methods:{
        titleClick(index){
          this.currentIndex=index
        },
        backClick(){
          // this.$router.go(-1)
          this.$router.back()
        }
      },

    }
</script>

<style scoped>
  .detail{
    position: relative;
    z-index: 333;
    background: #fff;
  }
  .center{
    display: flex;
  }
  .title{
    flex: 1;
  }
  .left img{
    margin-top: 10px;
  }
  .active{
    color: #ff8198;
  }
</style>
