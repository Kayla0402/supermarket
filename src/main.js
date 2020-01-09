import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import toast from './components/common/toast/index.js'

Vue.config.productionTip = false;
//创建事件总线，管理事件和VueX很像，从孙组件往父组件传事件bus  总线，公交车
Vue.prototype.$bus=new Vue();

//toast插件的安装--会自动执行toast的install方法
Vue.use(toast)
new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
