<template>
    <div class="bottom-menu">
      <CheckButton class="select-all" :isChecked="isSelectAll" @click.native="checkClick"></CheckButton>
      <span>全选</span>
      <span class="total-price">合计: ¥{{totalPrice}}</span>
      <span class="buy-product" @click="calcClick">去计算({{checkLength}})</span>
    </div>
</template>

<script>
  import CheckButton from '@/components/common/checkButton/CheckButton'
  //this.$store.getters.cartList有点长，可以专门引入getters中的函数为局部计算属性,就可以直接使用this.cartList属性名
  import {mapGetters} from 'vuex'
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
        ...mapGetters(['cartList']),
        totalPrice(){
          // const cartList=this.$store.getters.cartList;
          return this.cartList.filter(item=>{
            return item.checked
          }).reduce((preValue,item)=>{
            return preValue+item.newPrice*item.count
          },0).toFixed(2)
        },
        checkLength(){
          return this.cartList.filter(item=>item.checked).length
        },
        isSelectAll(){
          //方法1  filter
          if(this.cartList.length==0) return false;
          // return !(this.cartList.filter(item=>!item.checked).length)
          //方法2  find，性能高点
          // return (!this.cartList.find(item=>!item.checked))
          //普通js遍历
          for(let item of this.cartList){
            if(!item.checked){
              return false
            }
          }
          return true
        },

      },
      methods:{
        checkClick(){
          console.log(222);
          if(this.isSelectAll){
            this.cartList.forEach(item=>item.checked=false)
          }else {
            this.cartList.forEach(item=>item.checked=true)
          }
        },
        calcClick(){
          if(!this.isSelectAll){
            this.$toast.show('请选择您要购买的商品')
          }
        }
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
