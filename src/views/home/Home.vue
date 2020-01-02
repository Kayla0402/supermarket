<!--suppress ALL -->
<template>
  <div id="home">
<!--导航条-->
    <nav-bar class="nav_home">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-ctrl :titles="['流行','新款','精选']" @tabCtrl="tabCtrl" ref="tabCtrl1" class="tabCtrlTop" v-show="isTabFixed"/>

    <!-- 区域滚动-->
    <!--组件传值如果要特定传入的数据类型，则属性前需要添加:声明一下，而且传值要用驼峰命名法，大写字母用-加小写字母更改-->
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll" :pull-up-load="true" @pullingUp="moreGoods">
      <!--轮播图-->
      <banner :banner="banners" @swiperLoad="swiperLoad"></banner>
      <!-- 推荐 -->
      <recommend :recommends="recommends"/>
      <!--本周流行-->
      <feature/>
      <!--tabCtrl-->
      <tab-ctrl :titles="['流行','新款','精选']" @tabCtrl="tabCtrl" ref="tabCtrl2"/>
      <!--商品展示-->

      <good-list :goods="showGoods"></good-list>


    </scroll>
    <back-top @click.native="backTopClick" v-show="isShowBackTop"/>
  </div>
</template>

<script>
  import Recommend from './childComponents/RecommendView'
  import Feature from './childComponents/Feature'

  import NavBar from '@/components/common/navBar/NavBar'
  import Banner from '@/components/common/banner/Banner'
  import Scroll from '@/components/common/scroll/Scroll'
  import TabCtrl from '@/components/content/tabCtrl/TabCtrl'
  import GoodList from '@/components/content/goods/GoodList'
  import BackTop from '@/components/content/backTop/BackTop'
  import Gray10 from '@/components/content/Gray10'

  import { debounce } from '@/common/utils'

  import {getHomeMultidata ,getHomeGoods } from "@/network/home";

  export default {
    name: 'Home',
    components: {
      Recommend,
      Feature,

      NavBar,
      Banner,
      Scroll,
      TabCtrl,
      GoodList,
      BackTop,
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
        },
        currentType:'pop',
        isShowBackTop:false,
        tabCtrlOffsetTop:0,
        isTabFixed:false
      }
    },
    methods:{
      // 监听事件
      tabCtrl(index){
        switch (index) {
          case 0:
            this.currentType='pop'
            break;
          case 1:
            this.currentType='new'
            break;
          case 2:
            this.currentType='sell'
            break;
        }
        this.$refs.tabCtrl1.currentIndex=index;
        this.$refs.tabCtrl2.currentIndex=index;
      },
      //返回到顶部
      backTopClick(){
        // console.log('backTopClick');
        /*
        可以通过BScroll的一个scrollTo可以让他返回到最顶部，scrollTo(x,y,time)
        1.首先要获取到scroll组件，可以通过scroll.scroll获取scroll组件上的data数据中的scroll区域滚动对象，
        拿到scroll组件就可以拿到scroll组件中的所有数据和方法 this.$refs.scroll.scroll.scrollTo(0,0,500)
        这样操作有点懵逼，不太好理解，可以将scroll.scrollTo封装到Scroll.vue方法中，直接获取scroll组件调用方法即可
        */
        // this.$refs.scroll.scroll.scrollTo(0,0,500)
        this.$refs.scroll.scrollTo(0,0)
      },
      //接收scroll组件滚动的position参数
      contentScroll(position){
        // console.log(position);backtop
        this.isShowBackTop=-(position.y)>300?true:false;
        //觉得tabCtrl是否吸顶（position:fixed)
        this.isTabFixed=-(position.y)>this.tabCtrlOffsetTop?true:false;
      },

      //网络请求相关的方法
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
          //完成上拉加载更多，可以继续进行下次数据的加载而这个取消加载的事件也可以写在数据请求的方法中
          // this.$refs.scroll.finishPullUp()
        })
      },

      /*
      加载更多商品(此时只能加载一次，如果需要进行下次加载的话应该要释放这次的加载更多事件
      this.scroll.finishPullUp()
      * */
      moreGoods(){
        // console.log("更多商品");
        this.getHomeGoods(this.currentType);
        //而这个取消加载的事件也可以写在数据请求的方法中
        this.$refs.scroll.finishPullUp()
      },

      // /* 将防抖动的函数抽离出去，为功能性的函数，在utils.js中
      // * 防抖动函数debounce函数，使用在refresh上（图片加载一个就重新计算一下scroll可滑动高度）
      // * */
      // debounce(func,delay){
      //   let timer=null;
      //   return function (...args) {
      //     if(timer) clearTimeout(timer)
      //     timer=setTimeout(()=>{
      //       func.apply(this,args)
      //     },delay)
      //   }
      // }

      //吸顶效果，主要是一些大图片加载比较慢，直接用
      swiperLoad(){
        // console.log(444);
        // console.log(this.$refs.tabCtrl.$el.offsetTop);
        this.tabCtrlOffsetTop=this.$refs.tabCtrl2.$el.offsetTop;
      }

    },
    computed:{
      //注意这个计算属性的方法中要使用this，而且要关注一下计算属性如何进行引用，是变量还是属性值，计算属性是一个属性，引用的时候要把方法当成属性，所以不需要{}包裹进行引用，
      showGoods(){
        return this.goods[this.currentType].list
      },

    },
    created() {
      //不能再created中获取dom元素或者$refs,可能会获取不到，


      //1.请求多个数据  请求是异步的，如果直接输出的话估计会没有值，不知道什么时候能请求到数据
      this.getHomeMultidata()
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')
    },
    mounted() {
      //接收孙组件GoodListItem图片加载结束的事件,不能再created中获取dom元素或者$refs,可能会获取不到，
      /*
      * 此时refresh函数会执行30次，为了减轻服务器的压力和优化性能，可以使用防抖动函数debounce
      * 如果refresh函数输出111，不加防抖动则会输出30次，加了防抖动的话输出的次数会小于30次
      * */
      const refresh=debounce( this.$refs.scroll.refresh,200);

      this.$bus.$on('itemImageLoad',()=>{
        //刷新scroll组件，重新计算scrollHeight的高度
        // this.$refs.scroll.refresh()
       refresh()
      })
    }
  }
</script>

<style scoped>
  #home{
    margin-top: 44px;
    height: 100vh;
  }
  .nav_home {
    background-color: #ff8198;
    color: #fff;
  }
  .tabCtrlTop{
    position: relative;
    z-index: 111;
    top:0;
  }
  /*.tabCtrl{*/
  /*  !*position: sticky;*!*/
  /*  !*top:44px;*!*/
  /*}*/
  /*.fixed{*/
  /*  position: fixed;*/
  /*  top: 44px;*/
  /*  left: 0;*/
  /*  right: 0;*/
  /*  z-index: 88888;*/
  /*}*/
  .content{
    height: calc(100% - 49px);
    overflow: hidden;
    /*background-color: antiquewhite;*/
  }
</style>
