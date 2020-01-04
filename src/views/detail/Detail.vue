<template>
  <div id="detail">
    <detail-nav-bar/>
    <scroll class="content" ref="scrollDetail">
      <!--轮播图-->
      <detail-swiper :topImages="topImages"/>
      <!--   商品 详情展示-->
      <detail-base-info :goods="goods"></detail-base-info>
      <!--    店铺详情-->
      <detail-shop-info :shop="shop"></detail-shop-info>
      <!--      展示效果-->
      <detail-goods-info :detailInfo="detailInfo" @goodsInfoLoad="goodsDetailInfoLoad"></detail-goods-info>
      <!--      尺码展示-->
      <detail-param-info :paramInfo="paramInfo"></detail-param-info>
      <!--      评论信息展示-->
      <detail-comment-info :commentInfo="commentInfo"></detail-comment-info>
      <!--   推荐展示，新的接口recommend，展示用首页的产生展示GoodList组件-->
      <good-list :goods="recommends"></good-list>

    </scroll>
  </div>
</template>

<script>
  import DetailNavBar from './childComps/DetailNavBar'
  import {getDetail, GoodsInfo, Shop, GoodsParam, getRecommend} from "../../network/detail";
  import Scroll from '@/components/common/scroll/Scroll';
  import GoodList from '@/components/content/goods/GoodList'
  import { debounce } from '@/common/utils'

  import DetailSwiper from './childComps/DetailSwiper'
  import DetailBaseInfo from './childComps/DetailBaseInfo'
  import DetailShopInfo from './childComps/DetailShopInfo'
  import DetailGoodsInfo from './childComps/DetailGoodsInfo'
  import DetailParamInfo from './childComps/DetailParamInfo'
  import DetailCommentInfo from './childComps/DetailCommentInfo'

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
        recommends: []
      }
    },
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

      });
      //推荐数据的请求
      getRecommend().then(res => {
        // console.log(res);
        this.recommends = res.data.list
      })
    },
    methods: {

      goodsDetailInfoLoad() {
        // const refresh=debounce( this.$refs.scroll.refresh,200)
        // console.log('goodsDetailInfoLoad');
        this.$refs.scrollDetail.refresh()
        // refresh()
      }

    },
    mounted() {
      const refresh=debounce( this.$refs.scrollDetail.refresh,200);

      this.$bus.$on('DetailItemImageLoad', () => {
        // console.log('DetailItemImageLoad');
        // this.$refs.scrollDetail.refresh();
        refresh()
      })
    }

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
