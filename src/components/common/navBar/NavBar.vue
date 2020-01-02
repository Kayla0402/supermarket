<template>
  <div class="nav_bar">
    <div class="left">
      <slot name="left"/>
    </div>
    <div class="center">
      <slot name="center"/>
    </div>
    <div class="right">
      <slot name="right"/>
    </div>
  </div>
</template>

<script>
    export default {
    }
</script>

<style scoped>
  .nav_bar{
    height: 44px;
    line-height: 44px;
    display: flex;
    flex-direction: row;
    text-align: center;
    box-shadow:0 1px 1px rgba(0,0,0,0.1) ;
  }
  .left,.right{
    width: 60px;
  }
  .center{
    flex: 1;
  }
</style>
