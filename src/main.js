// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import "@/assets/css/style.css";
// 导入element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import myAxios from "@/plugins/myAxios.js";
import moment from "moment";
import nav from "@/views/comments/nav.vue";

Vue.component(nav.name,nav);
Vue.use(myAxios);
Vue.use(ElementUI);
Vue.config.productionTip = false;
Vue.filter('dataTotime',(date,D="YYYY-MM-DD")=>{
  return moment(date).format(D);
});
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
