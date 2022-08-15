import axios from 'axios';

const instance = axios.create({
    baseURL:'http://127.0.0.1:8083/',
    timeout:5000
})

// <!--
// 请求拦截
//     所有的网络请求都会先走这个方法,我们可以在里面添加一些自定义内容
// -->
// instance.interceptors.request.use(
//     function(config) {
//         return config;
//     }
//     function(err) {
//         return Promise.reject(err);
//     }
// )

// <!--
// 响应拦截
//     所有的网络请求返回数据之后都会先执行此方法
//     此处可以根据服务器返回的状态码做相应的处理
// -->
// instance.interceptors.response.use(
//     function(response) {
//         return response;
//     }
//     function(err) {
//         return Promise.reject(err);
//     }
// )

export function get(url,params) {
    return instance.get(url,{
        params
    })
}

export function post(url,data) {
    return instance.post(url,data)
}

export function del(url){
    return instance.delete(url)
}

export function put(url,data){
    return instance.put(url,data)
}
