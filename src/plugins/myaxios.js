import axios from "axios";
var myAxios={};
myAxios.install=function(Vue){
    var instance = axios.create({
        baseURL: 'http://localhost:8888/api/private/v1/',
      });
    Vue.prototype.$axios=instance;
};
export default myAxios;