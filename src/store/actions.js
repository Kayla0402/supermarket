import {ADD_COUNTER, ADD_TO_CART} from "./mutations_type";

export default {
  addCart(context,payLoad){
    //返回Promise，方便外边监听到什么时候回调完成
    return new Promise((resolve, reject) => {
      let oldProduct=null;
      for(let item of context.state.cartList){
        if(item.iid==payLoad.iid){
          oldProduct=item;
        }
      }
      if(oldProduct){   //给数量赋值
        // context.commit('addCounter',oldProduct)
        context.commit(ADD_COUNTER,oldProduct)
        resolve('给数量赋值')
      }else {
        payLoad.checked=true;
        payLoad.count=1;
        // context.commit('addToCar',payLoad)
        context.commit(ADD_TO_CART,payLoad)
        resolve('新增商品')

      }
    })

  }
}
