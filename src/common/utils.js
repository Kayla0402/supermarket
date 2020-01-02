//防抖动功能
    /*
      * 防抖动函数debounce函数，使用在refresh上（图片加载一个就重新计算一下scroll可滑动高度）
      * */
export function debounce(func,delay){
  let timer=null;
  return function (...args) {
    if(timer) clearTimeout(timer)
    timer=setTimeout(()=>{
      func.apply(this,args)
    },delay)
  }
}
