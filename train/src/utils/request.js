import axios from 'axios'
import router from '../router/index';
import { ElMessage } from 'element-plus'

const request = axios.create({
    baseURL: "http://localhost:9090",
    timeout: 5000
})

// 请求白名单，如果请求在白名单里面，将不会被拦截校验权限
const whiteUrls = ["/login/login", '/user/register']

// request 拦截器
// 可以自请求发送前对请求做一些处理
// 比如统一加token，对请求参数统一加密
request.interceptors.request.use(config => {
    config.headers['Content-Type'] = 'application/json;charset=utf-8';

    // 取出sessionStorage里面缓存的用户信息
    let userJson = JSON.parse(sessionStorage.getItem("user"))
    // console.error(userJson);
    if (!whiteUrls.includes(config.url)) {  // 校验请求白名单
        if(!userJson) {
            router.push("/login")
        } else {
            // let user = JSON.parse(userJson);
            // let token=localStorage.getItem("user")
            localStorage.setItem("token",userJson.staff.token)
            config.headers['token'] = userJson.staff.token;  // 设置请求头
        }
    }
    return config
}, error => {
    return Promise.reject(error)
});

    // response 拦截器
    // 可以在接口响应后统一处理结果
    request.interceptors.response.use(
        response => {
            let res = response.data;
            let token;
            if (!localStorage.getItem("token")) {
                token=localStorage.getItem("token")
            }
            // console.log("拦截器",res)

            // 如果是返回的文件
            if (response.config.responseType === 'blob') {
                return res
            }
            // 兼容服务端返回的字符串数据
            if (typeof res === 'string') {
                res = res ? JSON.parse(res) : res
            }
            // 验证token
            if (res.code === '401') {
                console.error("token过期，重新登录")
                // console.error(res)
                // Storage.localRemove('token')
                localStorage.clear();
                router.push("/login")
            }else if(res.code=='403'){
                console.error(res.msg);
                // ElMessage.error(res.msg);
            }else if(token){
                localStorage.setItem("token",token)
            }
            return res;
        },
        error => {
            console.log('err' + error) // for debug
            return Promise.reject(error)
        }
    )


export default request

