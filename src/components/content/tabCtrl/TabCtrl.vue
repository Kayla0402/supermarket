<template>
  <div class="tabCtrl">
    <div v-for="(item,index) in titles" @click="tabClick(index)">
      <span :class="{active:currentIndex===index}">{{item}}</span>
    </div>
  </div>
</template>

<script>
    export default {
      data(){
        return {
          currentIndex:0
        }
      },
      props:{
        titles:{
          type:Array,
          default(){
            return []
          }
        }
      },
      methods:{
        tabClick(index){
          this.currentIndex=index;
          this.$emit('tabCtrl',index)
        }
      }
    }
</script>

<style scoped>
  .tabCtrl{
    display: flex;
    height: 40px;
    line-height: 40px;
    font-size: 15px;
    background-color: #fff;
  }
  .tabCtrl div{
    flex: 1;
    text-align: center;
  }
  .tabCtrl span{
    padding: 5px;
  }
  .active{
    color: #ff5777;
    border-bottom: 2px solid #ff5777;
  }
</style>
