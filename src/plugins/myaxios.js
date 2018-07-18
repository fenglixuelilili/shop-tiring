import axios from "axios";
var myAxios={};

import NProgress from "nprogress";
myAxios.install=function(Vue){
    var instance = axios.create({
        baseURL: 'http://localhost:8888/api/private/v1/',
      });

      instance.interceptors.request.use(function (config) {
        NProgress.start();
        if(config.url.toLowerCase() != "login"){
            const token = sessionStorage.getItem('token');
            config.headers.Authorization=token;
        }
        return config;
      }, function (error) {
        return Promise.reject(error);
      });

      instance.interceptors.response.use(function (response) {
        // 对响应数据做点什么
        NProgress.done();
        // NProgress.remove();
        return response;
      }, function (error) {
        // 对响应错误做点什么
        return Promise.reject(error);
      });
    Vue.prototype.$axios=instance;
};
export default myAxios;