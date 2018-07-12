import axios from "axios";
var myAxios={};
myAxios.install=function(Vue){
    var instance = axios.create({
        baseURL: 'http://localhost:8888/api/private/v1/',
      });
      instance.interceptors.request.use(function (config) {
       
        if(config.url.toLowerCase() != "login"){
            const token = sessionStorage.getItem('token');
            config.headers.Authorization=token;
        }
        return config;
      }, function (error) {
        return Promise.reject(error);
      });

    Vue.prototype.$axios=instance;
};
export default myAxios;