/**
 * HTTP 请求公用模块 axios 版本
 */
//vue 模块
import Vue from 'vue'
import Qs from 'qs'
import axios from 'axios';

export default function() {
  //请求数据  process node对象 API_URL变量是通过dev.env require进来的
  var apiUrl = ""
  if (process.env.PATH_TYPE === 'local') {
    apiUrl = "http://localhost:12001/";
  } else {
    apiUrl = 'http://api.17sobt.com/';
  }
  axios.defaults.withCredentials = true;
  axios.defaults.headers.post['Content-Type'] = 'application/json; charset=UTF-8';
  return {
    //GET 请求
    get: function(api, params, callBack) {
      axios.get(apiUrl + api, {
          params: params,
          validateStatus: function(status) {
            return (status == 200 || status == 401); // 状态码在大于或等于500时才会 reject
          }
        }).then((response) => {
          if (response.status == 401) {
            window.router.push("/");
          } else {
            callBack(response.data);
          }
        })
        .catch(function(response) {
          console.log(response);
        });
    },
    //POST 请求
    post: function(api, params, callBack) {
      axios({
          method: 'post',
          url: apiUrl + api,
          data: params,
          validateStatus: function(status) {
            return (status == 200 || status == 401); // 状态码在大于或等于500时才会 reject
          }
        }).then((response) => {
          if (response.status == 401) {
            window.router.push("/");
          } else {
            callBack(response.data);
          }

        })
        .catch(function(response) {
          console.log(response);
        });
    },
    //提交文件表单
    postFile: function(api, params, callBack) {
      //处理下数据
      let _params = new FormData();
      for (let key in params) {
        _params.append(key, params[key]);
      }
      axios({
          method: 'post',
          url: apiUrl + api,
          data: _params,
          validateStatus: function(status) {
            return (status == 200 || status == 401); // 状态码在大于或等于500时才会 reject
          },
          headers: { 'Content-Type': 'multipart/form-data' }
        }).then((response) => {
          if (response.status == 401) {
            window.router.push("/");
          } else {
            callBack(response.data);
          }

        })
        .catch(function(response) {
          console.log(response);
        });
    }
  }
}