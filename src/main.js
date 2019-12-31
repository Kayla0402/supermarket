import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false;
//创建事件总线，管理事件和VueX很像，从孙组件往父组件传事件bus  总线，公交车
Vue.prototype.$bus=new Vue();

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
