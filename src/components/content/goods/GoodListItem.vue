<template>
  <div class="goodList">
    <a :href="item.link">
      <img :src="item.show.img" alt="">
      <div>{{item.title}}</div>
    </a>
  </div>
</template>

<script>
    export default {
      props:{
        goodList:{
            type:Array,
            default(){
              return []
            }
          }
      },

    }
</script>

<style scoped>

</style>
