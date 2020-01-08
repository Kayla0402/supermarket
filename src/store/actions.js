import {ADD_COUNTER, ADD_TO_CART} from "./mutations_type";

export default {
  addCart(context,payLoad){
    let oldProduct=null;
    for(let item of context.state.cartList){
      if(item.iid==payLoad.iid){
        oldProduct=item;
      }
    }
    //给数量赋值
    if(oldProduct){
      // context.commit('addCounter',oldProduct)
      context.commit(ADD_COUNTER,oldProduct)
    }else {
      payLoad.checked=true;
      payLoad.count=1;
      // context.commit('addToCar',payLoad)
      context.commit(ADD_TO_CART,payLoad)
    }

  }
}
