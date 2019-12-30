<template>
  <div class="wrapper" ref="aaa">
    <ul class="content">
      <li>222</li>
      <li>222</li>
      <li>222</li>
      <li>222</li>
      <li>222</li>
      <li>222</li>
      <li>222d</li>
      <li>222</li>
      <li>222</li>
      <li>222</li>
      <li>222</li>
      <li>222</li>
      <li>222</li>
      <li>222d</li>
      <li>222</li>
      <li>222</li>
      <li>222</li>
      <li>222</li>
      <li>222</li>
      <li>222</li>
      <li>222d</li>
      <li>222</li>
      <li>222</li>
      <li>222</li>
      <li>222</li>
      <li>222</li>
      <li>222</li>
      <li>222d</li>
      <li>222</li>
      <li>222</li>
      <li>222</li>
      <li>222</li>
      <li>222</li>
      <li>222</li>
      <li>222defg</li>
    </ul>
  </div>
</template>

<script>
  import BScroll from 'better-scroll';
    export default {
      data(){
        return{
          scroll:null
        }
      },
      //组件创建完后的调用---不能在此加载BScroll ，获取不到.category,,,在created中获取不到元素，undefined/null
      // created(){
      //   console.log(this.$refs.aaa);
      //   console.log(document.querySelector('.wrapper'));
      // },
      //组件创建完成后调用，不能在页面加载之前进行调用，此时.category获取不到，为undefined或者‘’或者null
      mounted() {
        //使用了 BScoll之后滑动区域的首位会有明显的余量，而不使用BScroll也没有任何余量
        this.scroll=new BScroll('.wrapper',{
          //监听滚动事件配置
          pullUpLoad: true,
          probeType:3,

        });
        //记住所有使用到的数据或者方法都要加上this.   scroll也需要加
        this.scroll.on('scroll',position=>{
          // console.log(position);
        });
        this.scroll.on('pullingUp',()=>{
          console.log('上拉加载更多');
          //设置多次可以进行上拉加载更多事件
          setTimeout(()=>{
            bscroll.finishPullUp()
          },2000)
        })

      },
    }
</script>

<style scoped>
  /*.wrapper{*/
  /*  overflow-y: hidden;*/
  /*}*/
  .wrapper{
    background-color: #ff8198;
    height: 100px;
    overflow-y: scroll;
  }
</style>
