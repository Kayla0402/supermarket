<!--suppress ALL -->
<template>
  <div id="home">
<!--    导航条-->
    <nav-bar class="nav_home">
      <div slot="center">购物街</div>
    </nav-bar>
<!--轮播图-->
    <banner :banner="banners" ></banner>
<!-- 推荐 -->
    <recommend :recommends="recommends"/>
<!--本周流行-->
    <feature/>





    <ul>
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
  import NavBar from '@/components/common/navBar/NavBar'
  import Banner from '@/components/common/banner/Banner'
  import Recommend from './childComponents/RecommendView'
  import Feature from './childComponents/Feature'

  import Gray10 from '@/components/content/Gray10'
  import {getHomeMultidata} from "@/network/home";

  export default {
    name: 'Home',
    components: {
      NavBar,
      Banner,
      Recommend,
      Feature,


      Gray10,

    },
    data(){
      return{
        banners:[],
        recommends:[],
      }
    },
    created() {
      //1.请求多个数据  请求是异步的，如果直接输出的话估计会没有值，不知道什么时候能请求到数据
      getHomeMultidata().then(res=>{
        console.log(res);
        this.banners=res.data.banner.list
        this.recommends=res.data.recommend.list
      })



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
</style>
