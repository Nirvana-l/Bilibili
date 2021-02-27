import axios from 'axios'
import router from '@/router'
import Vue from 'vue'

const http = axios.create({
    baseURL: 'http://112.74.99.5:3000/web/api'
})

//添加一个请求拦截器
http.interceptors.request.use(function (config) {
    //每次请求是加请求头
    if(localStorage.getItem('id') && localStorage.getItem('token')){
        config.headers.Authorization = 'Bearer ' + localStorage.getItem('token')
    }

    return config;
  }, function (error) {
    // 请求错误
    return Promise.reject(error);
  });

// 添加一个响应拦截器
http.interceptors.response.use(function (response) {
    // 使用响应数据
    return response;
  }, function (error) {
      if(error.response.status === 500){
        router.push('/login')
        Vue.prototype.$msg.fail(error.response.data.message)
      }
    // 响应错误
    return Promise.reject(error);
  });
export default http