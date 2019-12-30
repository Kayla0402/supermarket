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
        }
      },
      mounted() {
        this.scroll=new BScroll(this.$refs.wrapper,{
          //有些页面需要实时监测滚动的位置，所以不应该把ProbeType定死，影响性能
          probeType:this.probeType,
          pullUpLoad: true,
          click:true,
        });
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
        this.scroll.on('pullingUp',()=>{
          console.log('加载更多');
        })
      },
      methods:{
        scrollTo(x,y,time=500){
          this.scroll.scrollTo(x,y,time)
        }
      }
    }
</script>

<style scoped>

</style>
