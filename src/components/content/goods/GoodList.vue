<template>
  <div class="goodList">
<!--注意此时的动态属性绑定要使用驼峰命名法，绑定动态的属性要用-进行链接，而接收的时候要大写字母-->
    <good-list-item v-for="(item,index) in goods" :goods-item='item'  :key="index"/>
  </div>
</template>

<script>
  import GoodListItem from './GoodListItem'
    export default {
      name: "GoodsList",
      props:{
          goods:{
            type:Array,
            default(){
              return []
            }
          }
      },
      components:{
        GoodListItem
      },
    }
</script>

<style scoped>
  .goodList{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
  }

</style>
