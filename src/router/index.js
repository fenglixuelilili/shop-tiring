import Vue from 'vue'
import Router from 'vue-router'
import login from "@/views/login";
import home from "@/views/home";
Vue.use(Router)
import user from "@/views/user/user.vue";
import powerList from "@/views/user/powerList.vue";
import rolList from "@/views/user/rolList.vue";
import cate from "@/views/products/cate.vue";
import goods from "@/views/products/goods.vue";
import addGoods from "@/views/products/addGoods.vue";
// import addGoods from "@/views/products/addGoods.vue";
import orders from "@/views/dingdan/orders.vue";
import reports from "@/views/chars/chars.vue";
import { Message } from 'element-ui';
import NProgress from "nprogress";

const router = new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/',
      redirect:'/login'
    },
    {
      path: '/home',
      name: 'home',
      component: home,
      children:[
        {name:'user',path:'/users',component:user} ,
        {name:'powerList',path:'/rights',component:powerList}, 
        {name:'rolList',path:'/roles',component:rolList}, 
        {name:'categories',path:'/categories',component:cate},
        {name:'goods',path:'/goods',component:goods},
        {name:'addGoods',path:'/addGoods',component:addGoods},
        {name:'orders',path:'/orders',component:orders},
        {name:'reports',path:'/reports',component:reports},
      ]
    }
  ]
});
router.beforeEach((to,from,next)=>{
   NProgress.start();
    if(to.name=="login"){//如果是路由到登陆页面的话不用带token验证
        next();
    }else{
        const token = sessionStorage.getItem("token");
        if(!token){//没有token的话直接跳转到登陆页面
          router.push({name:"login"});
          // alert("您未登陆");
          Message.error("您未登陆");
          return;
      }
      next();
    }
    
});
router.afterEach((to, from) => {
  NProgress.done();
  // NProgress.remove();
})
export default router