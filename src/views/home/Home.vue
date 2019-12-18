<!--suppress ALL -->
<template>
  <div id="home">
<!--导航条-->
    <nav-bar class="nav_home">
      <div slot="center">购物街</div>
    </nav-bar>
<!--轮播图-->
    <banner :banner="banners" ></banner>
<!-- 推荐 -->
    <recommend :recommends="recommends"/>
<!--本周流行-->
    <feature/>
<!--tabCtrl-->
    <tab-ctrl :titles="['流行','新款','精选']" class="tabCtrl"/>
<!--商品展示-->
    <good-list :goods="goods.pop.list"></good-list>

    <ul>
      <li>222</li>
      <li>222</li>
      <li>222</li>
      <li>222</li>
      <li>222</li>
      <li>222</li>
      <li>222d</li>
      <li>222</li>
      <li>222</li>
      <li>222</li>
      <li>222</li>
      <li>222</li>
      <li>222</li>
      <li>222d</li>
      <li>222</li>
      <li>222</li>
      <li>222</li>
      <li>222</li>
      <li>222</li>
      <li>222</li>
      <li>222d</li>
      <li>222</li>
      <li>222</li>
      <li>222</li>
      <li>222</li>
      <li>222</li>
      <li>222</li>
      <li>222d</li>
      <li>222</li>
      <li>222</li>
      <li>222</li>
      <li>222</li>
      <li>222</li>
      <li>222</li>
      <li>222d</li>
    </ul>

  </div>
</template>

<script>
  import Recommend from './childComponents/RecommendView'
  import Feature from './childComponents/Feature'

  import NavBar from '@/components/common/navBar/NavBar'
  import Banner from '@/components/common/banner/Banner'
  import TabCtrl from '@/components/content/tabCtrl/TabCtrl'
  import GoodList from '@/components/content/goods/GoodList'

  import Gray10 from '@/components/content/Gray10'

  import {getHomeMultidata ,getHomeGoods } from "@/network/home";

  export default {
    name: 'Home',
    components: {
      Recommend,
      Feature,

      NavBar,
      Banner,
      TabCtrl,
      GoodList,

      Gray10,

    },
    data(){
      return{
        banners:[],
        recommends:[],
        goods:{
          'pop':{page:0,list:[]},
          'new':{page:0,list:[]},
          'sell':{page:0,list:[]},
        }
      }
    },
    methods:{
      getHomeMultidata(){
        getHomeMultidata().then(res=>{
          // console.log(res);
          this.banners=res.data.banner.list
          this.recommends=res.data.recommend.list
        })
      },

      getHomeGoods(type){
        const page=this.goods[type].page +1;
        getHomeGoods(type,page).then(res=>{
          //拼接上拉加载的数据，只能通过push，不能直接进行数组的赋值，不然会覆盖之前的数据
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page +=1
          // console.log(this.goods);
        })
      }


    },
    created() {
      //1.请求多个数据  请求是异步的，如果直接输出的话估计会没有值，不知道什么时候能请求到数据
      this.getHomeMultidata()

     this.getHomeGoods('pop')
     this.getHomeGoods('new')
     this.getHomeGoods('sell')



    }
  }
</script>

<style scoped>
  #home{
    padding-top: 44px;
    margin-bottom: 50px;
  }
  .nav_home {
    background-color: #ff8198;
    color: #fff;
  }
  .tabCtrl{
    position: sticky;
    top:44px;
  }
</style>
