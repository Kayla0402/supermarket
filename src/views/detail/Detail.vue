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
    </scroll>
  </div>
</template>

<script>
  import DetailNavBar from './childComps/DetailNavBar'
  import {getDetail,GoodsInfo,Shop} from "../../network/detail";
  import Scroll from '@/components/common/scroll/Scroll';
  import { debounce } from '@/common/utils'


  import DetailSwiper from './childComps/DetailSwiper'
  import DetailBaseInfo from './childComps/DetailBaseInfo'
  import DetailShopInfo from './childComps/DetailShopInfo'
  import DetailGoodsInfo from './childComps/DetailGoodsInfo'

  export default {
    name:'Detail',
      components:{
        DetailNavBar,
        DetailSwiper,
        DetailBaseInfo,
        DetailShopInfo,
        DetailGoodsInfo,
        Scroll
      },
      data(){
        return {
          iid:null,
          topImages:[],
          goods:{},
          shop:{},
          detailInfo:{}
        }
      },
      created() {
        this.iid=this.$route.params.iid;
        // console.log(this.$route.params.iid);
        //获取url的查询参数？？？？？？？？？
        getDetail(this.iid).then(res=>{
          // console.log(res);
          const data=res.result
          this.topImages=data.itemInfo.topImages;
          //产品信息
           this.goods=new GoodsInfo(data.itemInfo,data.columns,data.shopInfo.services)
        //  店铺信息
          this.shop=new Shop(data.shopInfo)
          //展示效果
          this.detailInfo = data.detailInfo
        })
      },
      methods:{

        goodsDetailInfoLoad() {
          // const refresh=debounce( this.$refs.scroll.refresh,200)
          console.log('goodsDetailInfoLoad');
          this.$refs.scrollDetail.refresh()
          // refresh()
        }

      },

    }
</script>

<style scoped>
#detail{
  position: relative;
  z-index: 222;
  background-color: #fff;
  height: 100vh;
}
  .content{
    position: absolute;
    top: 44px;
    bottom: 60px;
  }
</style>
