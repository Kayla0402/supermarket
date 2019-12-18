<!--suppress ALL -->
<template>
  <div id="home">
    <nav-bar class="nav_home">
      <div slot="center">购物街</div>
    </nav-bar>
  </div>
</template>

<script>
  import NavBar from '@/components/common/navBar/NavBar'
  import {getHomeMultidata} from "@/network/home";

  export default {
    name: 'Home',
    components: {
      NavBar
    },
    data(){
      return{
        banners:[],
        recommend:null,
      }
    },
    created() {
      //1.请求多个数据  请求是异步的，如果直接输出的话估计会没有值，不知道什么时候能请求到数据
      getHomeMultidata().then(res=>{
        // console.log(res);
        this.banners=res.data.banner.list
        this.recommend=res.data.recommend.list
      })



    }
  }
</script>

<style scoped>
  .nav_home {
    background-color: #FF6501;
    color: #fff;
  }
</style>
