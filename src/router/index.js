import Vue from 'vue';
import VueRouter from 'vue-router';

const Home=()=>import('../views/home/Home');
const Cart=()=>import('../views/cart/Cart');
const Message=()=>import('../views/message/Message');
const Category=()=>import('../views/category/Category');
const Detail=()=>import('../views/detail/Detail');


Vue.use(VueRouter);
const routes=[
  {
    path:'',
    redirect:'/home'
  },
  {
    path:'/home',
    component:Home
  },
  {
    path:'/cart',
    component:Cart
  },
  {
    path:'/message',
    component:Message
  },
  {
    path:'/category',
    component:Category
  },
  //动态路由的写法
  {
    path:'/detail/:iid',
    component:Detail
  },
  //查询参数url的写法
  // {
  //   path:'/detail',
  //   component:Detail
  // },



];
const router=new VueRouter({
  routes,
  mode:'history'
});
export default router
