<template>
  <div class="recommend">
    <div class="recommend_item" v-for="item in recommends">
      <a :href="item.link">
        <img :src="item.image">
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
    export default {
      props:{
          recommends:{
            type:Array,
            default(){
              return []
            }
          }
      }
    }
</script>

<style scoped>
.recommend{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin: 10px 0 10px;
  font-size: 12px;
  border-bottom: 10px solid #eee;
}
  .recommend_item{
    flex: 1;
    align-items: center;
    justify-content: center;
  }
  .recommend_item img{
    width: 60px;
    height: 60px;
  }
.recommend_item a{
  display: flex;
  flex-direction: column;
  height: 110px;
  align-items: center;
  justify-content: space-around;
}
</style>
