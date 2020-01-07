import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex);

const state={cartList:[]}
const store=new Vuex.Store({
  state,
  mutations,
  actions,
  //mutations中的方法是单一的一个功能的展示，而且只是同步的方法
  // mutations:{
  //   // addCart(state,payLoad){   //addCart方法中包含了两个功能，一个，是相同产品的数量++；另一个是，新产品的增加
  //   //   //先进行判断购物车中有没有此商品
  //   //   let oldProduct=null;
  //   //   for(let item of state.cartList){
  //   //     if(item.iid==payLoad.iid){
  //   //       oldProduct=item;
  //   //     }
  //   //   }
  //   //   //给数量赋值
  //   //   if(oldProduct){
  //   //     oldProduct.count+=1
  //   //   }else {
  //   //     payLoad.count=1;
  //   //     state.cartList.push(payLoad);
  //   //   }
  //   //
  //   // }
  //
  //   //将addCart方法中的相同产品的数量++和新产品增加方法抽离出来，便于跟踪
  //   addCounter(state,oldProduct){
  //     oldProduct.count+=1
  //   },
  //   addToCar(state,payLoad){
  //     state.cartList.push(payLoad);
  //   }
  // },
  //对于一些异步请求和一些复杂操作在actions中操作
  // actions:{
  //   addCart(context,payLoad){
  //     // context.state.cartList.push(payLoad)但不建议直接根据context.state修改state中的状态
  //     let oldProduct=null;
  //     for(let item of context.state.cartList){
  //       if(item.iid==payLoad.iid){
  //         oldProduct=item;
  //       }
  //     }
  //     //给数量赋值
  //     if(oldProduct){
  //       // oldProduct.count+=1
  //       context.commit('addCounter',oldProduct)
  //     }else {
  //       payLoad.count=1;
  //       context.commit('addToCar',payLoad)
  //       // context.state.cartList.push(payLoad);
  //     }
  //
  //   }
  // }
})

export default store;
