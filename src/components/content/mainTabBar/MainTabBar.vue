<template>
  <tab-bar>
    <tab-bar-item path="/home" activeColor="blue">
      <img slot="item_icon" src="@/assets/img/tabBar/home.png" alt="">
      <img slot="item_icon_active" src="@/assets/img/tabBar/homeA.png" alt="">
      <div slot="item_title">首页</div>
    </tab-bar-item>
    <tab-bar-item path="/category" activeColor="yellow">
      <img slot="item_icon" src="@/assets/img/tabBar/friends.png" alt="">
      <img slot="item_icon_active" src="@/assets/img/tabBar/friendsA.png" alt="">
      <div slot="item_title">分类</div>
    </tab-bar-item>
    <tab-bar-item path="/cart" activeColor="red">
      <img slot="item_icon" src="@/assets/img/tabBar/message.png" alt="">
      <img slot="item_icon_active" src="@/assets/img/tabBar/messageA.png" alt="">
      <div slot="item_title">购物车</div>
    </tab-bar-item>
    <tab-bar-item path="/profile" activeColor="green">
      <img slot="item_icon" src="@/assets/img/tabBar/mine.png" alt="">
      <img slot="item_icon_active" src="@/assets/img/tabBar/mineA.png" alt="">
      <div slot="item_title">我的</div>
    </tab-bar-item>
  </tab-bar>
</template>

<script>
  import tabBar from '@/components/common/tabBar/TarBar'
  import tabBarItem from '@/components/common/tabBar/TabBarItem'

  export default {
    name: "MainTabBar",
    components: {
      tabBar,
      tabBarItem
    }
  }
</script>

<style scoped>

</style>
