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
      el: "",
      data(){
        return{
          scroll:null
        }
      },
      mounted() {
        this.scroll=new BScroll(this.$refs.wrapper,{
          probeType:3,
          pullUpLoad: true
        });
        this.scroll.on('scroll',position=>{
          // console.log(position);
        });
        this.scroll.on('pullingUp',()=>{
          console.log('加载更多');
        })
      }
    }
</script>

<style scoped>

</style>
