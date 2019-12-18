<template>

  <swiper :options="swiperOption" ref="mySwiper">
    <div class="swiper-slide" v-for="item in banner" v-if="banner!=''">
      <a :href="item.link">
        <div class="swiper-img flex3">
          <img :src="item.image" width="100%"   alt="banner" style="display:block;">
        </div>
      </a>
    </div>
    <div class="swiper-pagination"  slot="pagination"></div>
  </swiper>

</template>

<script>

  import { swiper, swiperSlide } from 'vue-awesome-swiper'
  require('swiper/dist/css/swiper.css')
  export default {
    name: 'carrousel',
    components: {
      swiper,
      swiperSlide
    },
    data() {
      return {
        swiperOption: {
          notNextTick: true,
          //循环
          loop:true,
          //设定初始化时slide的索引
          initialSlide:0,
          //自动播放
          autoplay: {
            delay: 2000,
            stopOnLastSlide: false,
            disableOnInteraction: true,
          },
          //滑动速度
          speed:800,
          //滑动方向
          direction : 'horizontal',
          //小手掌抓取滑动
          grabCursor : true,
          //滑动之后回调函数
          on: {
            slideChangeTransitionEnd: function(){
              //切换结束时，告诉我现在是第几个slide
              // console.log(this.activeIndex);
            },
          },
          //左右点击
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },
          //分页器设置
          pagination: {
            el: '.swiper-pagination',
            clickable :true,
            type: 'custom',
            //自定义分页器样式
            renderCustom: function (swiper, current, total) {
              const activeColor = 'red'
              const normalColor = '#fff'
              let color = ''
              let paginationStyle = ''
              let html = ''
              for (let i = 1; i <= total; i++) {
                if (i === current) {
                  color = activeColor
                } else {
                  color = normalColor
                }
                paginationStyle = `background:${color};opacity:1;margin-right:10px;width:10px;height:10px;transform:skew(0deg);border-radius:20px;`
                html += `<span class="swiper-pagination-bullet" style=${paginationStyle}></span>`
              }
              return html
            }
          }
        }
      }
    },
    props:{
      banner:{
        type: Array,
        default(){
          return []
        }
      }
    },

    // 如果你需要得到当前的swiper对象来做一些事情，你可以像下面这样定义一个方法属性来获取当前的swiper对象，同时notNextTick必须为true
    computed: {
      swiper() {
        return this.$refs.mySwiper.swiper
      }
    },
    mounted() {
      // 然后你就可以使用当前上下文内的swiper对象去做你想做的事了
      // console.log('this is current swiper instance object', this.swiper)
      // this.swiper.slideTo(3, 1000, false)
    }
  }
</script>

<style scoped>
  .swiper-container{
    /*height:200px;*/
    overflow: hidden;
    margin-top:0;/*px*/
  }
  .swiper-wrapper{
    /*height:200px;*/
  }
  .swiper-slide{
    /*height:200px;*/
    float: left;
    background:pink;
  }


</style>
