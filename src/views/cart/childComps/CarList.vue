<template>
  <div class="cart_list">
    <scroll class="content" ref="scroll">
      <cart-list-item v-for="(item,index) in cartList"
                      :key="index" :itemInfo="item"></cart-list-item>
    </scroll>
  </div>
</template>

<script>
  import Scroll from '@/components/common/scroll/Scroll'
  import {mapGetters} from 'vuex'
  import CartListItem from './CartListItem'

  export default {
    name: "CarList",
    components: {
      Scroll,
      CartListItem,
    },
    computed:{
      ...mapGetters(['cartList'])
    },
    activated(){
      //刚开始购物车页面为空，所以scrollHeight为0，等数据都加载好之后可滚动的高度还是0，所以要页面一进来就开始刷新scroll
      this.$refs.scroll.refresh()
    }
  }
</script>

<style scoped>
  .cart_list {
    height:calc(100%- 300px);
  }
  .content {
    height: 100%;
    overflow: hidden;
  }

</style>
