<template>
  <div class="tab_bar_item" @click="itemClick">
    <slot name="item_icon" v-if="!isActive"/>
    <slot name="item_icon_active" v-else/>
<!--    <div :class="{active:isActive}">-->
    <div :style="activeStyle">
      <slot name="item_title"/>
    </div>
  </div>
</template>

<script>
  export default {
    name: "TabBarItem",
    props: {
      path: String,
      activeColor: {
        type: String,
        default: 'red'
      }
    },
    computed: {
      isActive() {
        return this.$route.path.indexOf(this.path) !== -1
      },
      activeStyle(){
       return  this.isActive?{color:this.activeColor}:{}
      }
    },
    data() {
      return {
        // isActive:true,
      }
    },
    methods: {
      itemClick() {
        this.$router.push(this.path)
      }
    }
  }
</script>

<style scoped>
  .tab_bar_item {
    flex: 1;
    text-align: center;
    font-size: 14px;
    padding-top: 3px;
  }

  .active {
    color: red
  }
  .tab_bar_item img{
    width: 25px;
  }
</style>
