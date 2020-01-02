<template>
  <div class="goodListItem">
    <a :href="goodsItem.link">
      <img :src="goodsItem.show.img" alt="" @load="imageLoad">
      <p>{{goodsItem.title}}</p>
      <div class="goodDetail">
        <span>¥{{goodsItem.price}}</span><span>{{goodsItem.cfav}}</span>
      </div>
    </a>
  </div>
</template>

<script>
    export default {
      props:{
        goodsItem:{
          //注意此时传过来的数据是每个Item对象，类型为Object，而不是一个Array了
            type:Object,
            default(){
              return {}
            }
          }
      },
      methods:{
        /*
        * 原生的js中监测图片加载完成   img.onLoad=function(){...},
        * 而Vue中已经封装好了@load=事件，
        * 要将@load发射给Home.vue组件（爷爷组件），不太好传，利用$but.$emit
        * */
        imageLoad(){
          // console.log(111);
          // console.log("imageLoad");
          //将图片加载好的事件发射给Home组件,Home组件的created事件中接收$bus.$emit('itemImageLoad')
          this.$bus.$emit('itemImageLoad')
        }
      }

    }
</script>

<style scoped>
  .goodListItem{
    width: 48%;
  }
  .goodListItem a{
    display: flex;
    flex-direction: column;
    text-align: center;
    align-items: center;
    width: 100%;
  }
  .goodListItem img{
    width: 100%;
    border-radius: 5px;
  }
  .goodDetail{
    display: flex;
    justify-content: space-between;
    min-width:40%;
    font-size: 12px;
  }
  .goodDetail span:first-child{
    color: #ff5777;
  }
  .goodListItem p{
    display: -webkit-box;/*作为弹性伸缩盒子模型显示*/
    -webkit-line-clamp: 1; /*显示的行数；如果要设置2行加...则设置为2*/
    overflow: hidden; /*超出的文本隐藏*/
    text-overflow: ellipsis; /* 溢出用省略号*/
    -webkit-box-orient: vertical;/*伸缩盒子的子元素排列：从上到下*/
    font-size: 12px;
    margin: 5px 0;
  }
</style>
