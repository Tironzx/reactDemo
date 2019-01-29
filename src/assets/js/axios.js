

import Axios from 'axios';



const $url = {
    bak_api:'url', //接口地址
    img_upload:'url' //图片上传地址
}
const $http = function (params) {
    //请求拦截器
    Axios.interceptors.request.use(function(config){
        if(config.url !== 'url'){
            config.headers['Administrator-Access-Token'] = window.sessionStorage.getItem('token');
        }
        // config.headers['Content-Type'] = "application/json";
        config.headers.post['Content-Type'] = "application/json";
        return config;
    },function(error){
        return Promise.reject(error);
    })

    //响应拦截器
    Axios.interceptors.response.use(function(response){
        if(response.data.code ==='10006'){ //异常错误,退出重新登录
            params._this.props.history.push('/')
        }
        if(response.request.responseURL ==='url'){ //登录回调需要保存token
            window.sessionStorage.setItem('token',response.headers['administrator-access-token']);
        }
        return response;
    },function(error){
        return Promise.reject(error);
    })


    if(params.method ==='post'){ //post请求
        Axios.post(params.url+params.api,params.data).then((res)=>{
            // console.log(res.data)
            if(res.data.result === 1){ //请求成功
                // console.log(res.data.body.AccessToken)
                params.success(res.data.body);
            }else{ //抛出异常
                params.error(res.data.message);
            }
        }).catch(err=>{
            console.log(err);
        });
    }else if(params.method ==='get'){
        Axios.get(params.url+params.api,{params:params.data}).then((res)=>{
            // console.log(res.data)
            if(res.data.result === 1){ //请求成功
                params.success(res.data.body);
            }else{ //请求抛出异常
                params.error(res.data.message);
            }
        }).catch(err=>{
            console.log(err);
        });
    }
}

export { $http,$url}