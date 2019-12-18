<template>
  <div class="goodList">
    <div v-for="item in goods" class="goodListItem" :class="{'mR10':index%2 != 0}">
      <a :href="item.link" >
        <img :src="item.show.img" alt="">
        <span>{{item.title}}</span>
      </a>
    </div>
  </div>
</template>

<script>
  // import GoodListItem from './GoodListItem'
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
        // GoodListItem
      },

    }
</script>

<style scoped>
.goodList{
  display: flex;
  flex-wrap: wrap;
  padding: 10px;
}
  .goodListItem{
    flex: 1;
  }
.goodListItem a{
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
}
.mR10{
  margin-right: 10px;
}
  .goodListItem img{
    width: 150px;

  }
.goodListItem span{
  display: -webkit-box;/*作为弹性伸缩盒子模型显示*/
  -webkit-line-clamp: 1; /*显示的行数；如果要设置2行加...则设置为2*/
  overflow: hidden; /*超出的文本隐藏*/
  text-overflow: ellipsis; /* 溢出用省略号*/
  -webkit-box-orient: vertical;/*伸缩盒子的子元素排列：从上到下*/
  font-size: 12px;
  padding: 10px;
}
</style>
