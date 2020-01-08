<template>
  <div id="detail">
    <detail-nav-bar @titleClick="titleClick" ref="nav"/>
    <scroll class="content" ref="scroll" @scroll="contentScroll" :probeType="3">
      <!--轮播图-->
      <detail-swiper :topImages="topImages"/>
      <!--   商品 详情展示-->
      <detail-base-info :goods="goods"></detail-base-info>
      <!--    店铺详情-->
      <detail-shop-info :shop="shop"></detail-shop-info>
      <!--      展示效果-->
      <detail-goods-info :detailInfo="detailInfo" @goodsInfoLoad="goodsDetailInfoLoad"></detail-goods-info>
      <!--      尺码展示-->
      <detail-param-info :paramInfo="paramInfo" ref="params"></detail-param-info>
      <!--      评论信息展示-->
      <detail-comment-info :commentInfo="commentInfo" ref="comment"></detail-comment-info>
      <!--   推荐展示，新的接口recommend，展示用首页的产生展示GoodList组件-->
      <good-list :goods="recommends" ref="recommend"></good-list>

    </scroll>
<!--    底部加入购物车-->
    <detail-bottom-bar @addToCart="addCart"></detail-bottom-bar>
<!--    回到顶部-->
    <back-top @click.native="backTopClick" v-show="isShowBackTop"/>

  </div>
</template>

<script>
  import DetailNavBar from './childComps/DetailNavBar'
  import {getDetail, GoodsInfo, Shop, GoodsParam, getRecommend} from "../../network/detail";
  import Scroll from '@/components/common/scroll/Scroll';
  import GoodList from '@/components/content/goods/GoodList'
  import { debounce } from '@/common/utils'
  //混入
  import {testMixin ,backTopMixin} from '@/common/mixin'

  import DetailSwiper from './childComps/DetailSwiper'
  import DetailBaseInfo from './childComps/DetailBaseInfo'
  import DetailShopInfo from './childComps/DetailShopInfo'
  import DetailGoodsInfo from './childComps/DetailGoodsInfo'
  import DetailParamInfo from './childComps/DetailParamInfo'
  import DetailCommentInfo from './childComps/DetailCommentInfo'
  import DetailBottomBar from './childComps/DetailBottomBar'

  export default {
    name: 'Detail',
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      GoodList,
      DetailBottomBar,
      Scroll
    },
    data() {
      return {
        iid: null,
        topImages: [],
        goods: {},
        shop: {},
        detailInfo: {},
        paramInfo: {},
        commentInfo: {},
        recommends: [],
        // recommendsOffset:null,
        themeTopYs:[],
        getThemeTopY:null,
        currentIndex:null,
      }
    },
    /*
    * 如何获取到参数，评论，推荐中的offsetTop值？？？？？？
    * 1.如果在created中是获取不到Dom或者$refs元素的，所以此方法不行
    * 2.如果在mounted中，为undefined，是因为this.$refs.comment.$el，$el为整个组件的最外层，此时进行了判断，<div class="param-info" v-if="Object.keys(paramInfo).length !== 0">，，如果此时有数据才会有这个元素的展示，此时没有数据，所以$el元素不存在，自然获取不到offsetTop的数值
    * 3.在created中会获取到每个子组件的数据，在数据赋值之后在通过this.$refs.comment.$el.offsetTop获取高度，此时也不行，因为数据赋值之后进行dom的渲染需要一定的时间，此时仅有数据，dom还没有渲染完毕
    *   ok  6.或者可以利用upDated(){ 数据更新中的方法，数据每次更新时都会进行此方法中的回调 } 次数的调用会有点多，但是每次要把this.themeTopYs赋值为空，防止每次数据的push的叠加
    * 4.在3的基础上，利用$nextTick( ()=>{ 此时内部已经渲染完毕  } )方法，也获取不到正确的offsetTop值，因为此时dom已经渲染完毕，但是图片并没全部加载完成，获取的数值不准确
    *   ok  5.利用methods方法中的图片加载完成之后的回调，在此时进行this.$refs.comment.$el.offsetTop的获取，可以获取到值，但是太过频繁，利用防抖函数debounce，data中定义一个方法getThemeTopY，在mounted中进行方法的赋值,push(...offsetTop),而后在methods方法的图片加载完成的回调后调用this.getThemeTopY()
    *   ok  6.或者可以利用upDated(){ 数据更新中的方法，数据每次更新时都会进行此方法中的回调 } 次数的调用会有点多，但是每次要把this.themeTopYs赋值为空，防止每次数据的push的叠加
    * */
    created() {
      this.iid = this.$route.params.iid;
      // console.log(this.$route.params.iid);
      //获取url的查询参数？？？？？？？？？
      getDetail(this.iid).then(res => {
        // console.log(res);
        const data = res.result
        this.topImages = data.itemInfo.topImages;
        //产品信息
        this.goods = new GoodsInfo(data.itemInfo, data.columns, data.shopInfo.services)
        //  店铺信息
        this.shop = new Shop(data.shopInfo)
        //展示效果
        this.detailInfo = data.detailInfo
        //尺码展示
        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule);
        //评论展示--有的商品是没有评论信息的
        if (data.rate.list) {
          this.commentInfo = data.rate.list[0];
        }

        //此时获取到了数据，并且将数据传递给子组件了，$el有值，
        // 3.console.log(this.$refs.comment.$el.offsetTop);===undefined,$el存在，但是dom的渲染需要一定的时间，此时内部dom渲染还没有渲染结束

        //4.此时可以获取到值，但是有缓存的时候是正确的，重新进来 页面之后图片没有加载完成，此时的值获取的不准确
        // this.$nextTick(()=>{
        //   console.log(this.$refs.comment.$el.offsetTop);
        // })


      });
      //推荐数据的请求
      getRecommend().then(res => {
        // console.log(res);
        this.recommends = res.data.list
      })

      //5.获取this.$refs.comment.$el.offsetTop的高度的方法
      this.getThemeTopY=debounce(()=>{
        this.themeTopYs.push(0)
        this.themeTopYs.push(this.$refs.params.$el.offsetTop)
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
      },200)


    },
    methods: {
//图片加载完成的事件
      goodsDetailInfoLoad() {
        // const refresh=debounce( this.$refs.scroll.refresh,200)
        // console.log('goodsDetailInfoLoad');
        this.$refs.scroll.refresh()
        // refresh()
        //5.此时图片加载完成了，获取this.$refs.comment.$el.offsetTop,调用太频繁了，利用debounce函数
        // console.log(this.$refs.comment.$el.offsetTop);
        this.getThemeTopY();
        // this.themeTopYs=[]
        // this.themeTopYs.push(0)
        // this.themeTopYs.push(this.$refs.params.$el.offsetTop)
        // this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
        // this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)

      },

      //点击title进行滚动scroll
      titleClick(index){

        // if(index==1){
        //   this.$refs.scroll.scrollTo(0,-300,500)
        // }
        //不要这么判断index是多少进而给每次一个滚动事件
        // switch (index) {
        //   case 0:
        //     this.$refs.scroll.scrollTo(0,0,500)
        //     break;
        //   case 1:
        //     this.$refs.scroll.scrollTo(0,-300,500)
        //     break;
        //   case 2:
        //     this.$refs.scroll.scrollTo(0,-700,500)
        //     break;
        //   case 3:
        //     this.$refs.scroll.scrollTo(0,-this.recommendsOffset,500)
        //     break;
        // }
        //直接定义一个data数据themeTopYs数组形式，根据index获取对应的数组中的数据，进而直接scrollTo（0，themeTopYs[index],2000)
        this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],500)

      },

      //监听scroll滚动的位置
      contentScroll(position){
        // console.log(position);
        const positionY=-position.y;
        // console.log(this.themeTopYs);
        // console.log(this.positionY);
        let length=this.themeTopYs.length;
        for(let i=0;i<length;i++){
          if(this.currentIndex!==i&&(i<length-1&&positionY>this.themeTopYs[i]&&positionY<this.themeTopYs[i+1])||(i==length-1&&positionY>this.themeTopYs[i])){
            // console.log(i);
            this.currentIndex=i;
            this.$refs.nav.currentIndex=this.currentIndex;
          }
        }

      //回到顶部
        this.isShowBackTop=positionY>300?true:false;

      },

      //加入购物车
      addCart(){
        // console.log(this.goods);
        const obj = {}
        // 2.对象信息
        obj.iid = this.iid;
        obj.imgURL = this.topImages[0]
        obj.title = this.goods.title
        obj.desc = this.goods.desc;
        obj.newPrice = this.goods.realPrice;
        // this.$store.commit('addCart',obj);
        this.$store.dispatch('addCart',obj)
        console.log(this.$store.state.cartList);
      }

    },
    mounted() {
      // console.log('不是混入中的mounted事件');
      const refresh=debounce( this.$refs.scroll.refresh,200);

      this.$bus.$on('DetailItemImageLoad', () => {
        // console.log('DetailItemImageLoad');
        // this.$refs.scroll.refresh();
        refresh();

      });

      //2. console.log(this.$refs.comment.$el.offsetTop);===undefined,获取不到数据，则子组件不展示，无$el元素

    },
    //混入测试，
    mixins:[testMixin,backTopMixin],
    //6.每次数据更新的事件，执行多次
    // updated() {
    //   //不太准确
    //     this.themeTopYs=[];
    //     this.themeTopYs.push(0)
    //     this.themeTopYs.push(this.$refs.params.$el.offsetTop)
    //     this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
    //     this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
    //     console.log(this.themeTopYs);
    // }

  }
</script>

<style scoped>
  #detail {
    position: relative;
    z-index: 222;
    background-color: #fff;
    height: 100vh;
  }

  .content {
    position: absolute;
    top: 44px;
    bottom: 60px;
  }
</style>
