<!--区域滚动-->
<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
    export default {
      data(){
        return{
          scroll:null
        }
      },
      props:{
        probeType:{
          type:Number,
          default:0,
        },
        pullUpLoad:{
          type: Boolean,
          default: false
        }
      },
      mounted() {
        this.scroll=new BScroll(this.$refs.wrapper,{
          //有些页面需要实时监测滚动的位置，所以不应该把ProbeType定死，影响性能
          probeType:this.probeType,
          pullUpLoad: this.pullUpLoad,
          click:true,
        });
        //区域滚动可滚动的高度
        // console.log(this.scroll.scrollerHeight);
        //监听滚动的位置
        this.scroll.on('scroll',position=>{
          // console.log(position);
          /*
          此时并不是scroll这个组件需要监听滚动的位置，
          而是使用scroll组件的父组件需要position，所以要把position传给父组件,
          哪个父组件需要position哪个父组件就接收发射的scroll事件
          */
          this.$emit('scroll',position)
        });
        /*
        * 此时只能加载一次，如果需要进行下次加载的话应该要释放这次的加载更多事件
        * this.scroll.finishPullUp()
        * */
        this.scroll.on('pullingUp',()=>{
          // console.log('加载更多');
          this.$emit('pullingUp')
        })
      },
      methods:{
        scrollTo(x,y,time=500){
          this.scroll.scrollTo(x,y,time)
        },
        refresh(){
          console.log(111);

          this.scroll&&this.scroll.refresh()
        },
        //释放加载更多好进行下次的加载
        finishPullUp(){
          this.scroll.finishPullUp()
        }
      }
    }
</script>

<style scoped>

</style>
