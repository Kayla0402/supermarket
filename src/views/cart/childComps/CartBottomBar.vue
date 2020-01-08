<template>
    <div class="bottom-menu">
      <CheckButton class="select-all"></CheckButton>
      <span>全选</span>
      <span class="total-price">合计: ¥{{totalPrice}}</span>
      <span class="buy-product">去计算()</span>
    </div>
</template>

<script>
  import CheckButton from '@/components/common/checkButton/CheckButton'
    export default {
      name: "CartBottomBar",
      components: {
        CheckButton
      },
      data(){
        return{
          priceNew:null,
        }
      },
      computed:{
        totalPrice(){
          return this.$store.getters.cartList.filter(item=>{
            return item.checked=true;
          })
          //   .reduce((preValue,item)=>{
          //   return preValue+item.price*item.count
          // })
        },
        // price(){
        //   console.log(this.totalPrice);
        //   for(let item of this.totalPrice){
        //     console.log(item.newPrice*item.count);
        //     this.priceNew+=(item.newPrice*item.count)
        //     console.log(this.priceNew);
        //   }
        // }


      },
      methods:{

      }
    }
</script>

<style scoped>
.bottom-menu {
  width: 100%;
  height: 44px;
  background-color: #eee;
  position: fixed;
  bottom: 50px;
  left: 0;
  box-shadow: 0 -2px 3px rgba(0, 0, 0, .2);
  font-size: 14px;
  color: #888;
  line-height: 44px;
  padding-left: 35px;
  box-sizing: border-box;
}

.bottom-menu .select-all {
  position: absolute;
  line-height: 0;
  left: 12px;
  top: 13px;
}

.bottom-menu .total-price {
  margin-left: 15px;
  font-size: 16px;
  color: #666;
}

.bottom-menu .buy-product {
  background-color: orangered;
  color: #fff;
  width: 100px;
  height: 44px;
  text-align: center;
  line-height: 44px;
  float: right;
}
</style>
