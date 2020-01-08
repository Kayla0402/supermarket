<template>
  <div class="content">
    <nav-bar class="cart">
      <div slot="center">购物车({{cartLength}})</div>
    </nav-bar>
<!--    购物车列表-->
    <cart-list class="cartList"></cart-list>
<!--    底部计算-->
      <cart-bottom-bar></cart-bottom-bar>
<!--    <scroll class="content">-->
<!--    </scroll>-->
  </div>
</template>

<script>
  import NavBar from '@/components/common/navBar/NavBar'
  //将vuex中的getters变为局部计算属性
  import {mapGetters} from 'vuex'
  import CartList from './childComps/CarList'
  import CartBottomBar from './childComps/CartBottomBar'
  export default {
    name:'Cart',
    components: {
      NavBar,
      // Scroll,
      CartList,
      CartBottomBar,
    },
    computed:{
      ...mapGetters(['cartLength'])
    },
    methods:{

    }


  }
</script>

<style scoped>
  .cart{
    background-color: #ff8198;
    color: #fff;
  }
  .cartList{
    height:100vh;
  }
</style>
