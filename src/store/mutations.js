import {ADD_COUNTER,ADD_TO_CART} from './mutations_type'
export default {
  [ADD_COUNTER](state,oldProduct){
    oldProduct.count+=1
  },
  [ADD_TO_CART](state,payLoad){
    state.cartList.push(payLoad);
  }
}
