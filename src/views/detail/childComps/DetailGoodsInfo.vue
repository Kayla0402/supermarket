<template>
  <div v-if="Object.keys(detailInfo).length !== 0" class="goods-info">
    <div class="info-desc clear-fix">
      <div class="start">
      </div>
      <div class="desc">{{detailInfo.desc}}</div>
      <div class="end"></div>
    </div>
    <div class="info-key">{{detailInfo.detailImage[0].key}}</div>
    <div class="info-list">
      <img v-for="(item, index) in detailInfo.detailImage[0].list" :src="item" @load="goodsInfoLoad">
    </div>
  </div>
</template>

<script>
	export default {
		name: "DetailGoodsInfo",
    props: {
      detailInfo: {
        type: Object
      }
    },
    data(){
		  return{
		    counter:0,
        //此时可以直接赋值图片的长度就是展示的图片长度，
        // 也可以赋值为0，然后检测detailInfo数值的变化，进而监测detailInfo中应展示图片的长度
        // imageLength:this.detailInfo.detailImage[0].list.length,  获取不到图片的长度
        imageLength:0,
      }
    },
    /*
     * 为了防止发射多次goodsInfoLoad事件，应该判断产品 展示图片的加载完成，
     * 可以定义一个data，创建数据counter，在图片每次加载完成的时候counter++，
     * 当counter和产品展示详情中的图片数量一致的时候，即图片加载完成。
     * 此时发射事件出去即可this.$emit('goodsInfoLoad')
     * */
    methods:{
      goodsInfoLoad(){
        /*
        * console.log("goodsInfoLoad");
        * this.$emit('goodsInfoLoad');
        * 此时每加载完一张图片都会发射一个事件this.$emit('goodsInfoLoad');，
        * */
        // console.log(this.imageLength);  而此时只发射一次事件，在所有的图片都加载完成后发射
        //++逻辑，先加后对比
        if(++this.counter===this.imageLength) this.$emit('goodsInfoLoad')

      }
    },
    /*
    * 注意watch()方法是监测属性值变化的，要把监测的属性值写成一个方法，
    * 是监测最终变化值的一个状态，如果数据会变化20次，但此数据方法之会执行最终变化的那一次，即方法只执行一次
    * */
    watch:{
      detailInfo(){
        // console.log(222);
        this.imageLength=this.detailInfo.detailImage[0].list.length;
        // console.log(this.imageLength);
      }
    }
	}
</script>

<style scoped>
  .goods-info {
    padding: 20px 0;
    border-bottom: 5px solid #f2f5f8;
  }

  .info-desc {
    padding: 0 15px;
  }

  .info-desc .start, .info-desc .end {
    width: 90px;
    height: 1px;
    background-color: #a3a3a5;
    position: relative;
  }

  .info-desc .start {
    float: left;
  }

  .info-desc .end {
    float: right;
  }

  .info-desc .start::before, .info-desc .end::after {
    content: '';
    position: absolute;
    width: 5px;
    height: 5px;
    background-color: #333;
    bottom: 0;
  }

  .info-desc .end::after {
    right: 0;
  }

  .info-desc .desc {
    padding: 15px 0;
    font-size: 14px;
  }

  .info-key {
    margin: 10px 0 10px 15px;
    color: #333;
    font-size: 15px;
  }

  .info-list img {
    width: 100%;
  }
</style>
