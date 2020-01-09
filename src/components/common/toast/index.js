import Toast from './Toast'
const obj={};
obj.install=function (Vue) {
  /*
  * 1.创建组件构造器
  * 2.new的方式，根据组件构造器创建一个组件对象
  * 3.将组件对象，手动挂载到某一元素上
  * 4.toast.$el就是对于的div了
  * 5.添加到Vue的原型上
  * */
  const toastConstructor=Vue.extend(Toast)
  const toast=new toastConstructor()
  toast.$mount(document.createElement("div"))
  document.body.appendChild(toast.$el)
  Vue.prototype.$toast=toast
};
export default obj;
