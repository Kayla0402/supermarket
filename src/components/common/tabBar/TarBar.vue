<template>
  <div class="tab_bar">
      <slot></slot>
  </div>
</template>

<script>
  import tabBarItem from './TabBarItem'
    export default {
        name: "TarBar",
      components:{
        tabBarItem
      }
    }
</script>

<style scoped>
  .tab_bar{
    display: flex;
    background-color: #f6f6f6;
    box-shadow:0 -1px 1px rgba(0,0,0,0.1) ;
    height: 49px;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
  }

</style>
