import axios from 'axios'


const baseURL = '/'// 此处和webpack的publicPath保持一致

// 创建axios实例
let service = axios.create({
  baseURL: baseURL,
  withCredentials: true,// 跨域访问带上cookie
  timeout: 30000 // 请求超时时间
})

// 添加request拦截器
service.interceptors.request.use(config => {
  return config
}, error => {
  Promise.reject(error)
})
// 添加respone拦截器
service.interceptors.response.use(
  response => {

    return response.data
  },
  error => {
    return Promise.reject(error.response)
  }
)

function get (url, params = {}) {
  return service({
    url: url,
    method: 'get',
    params
  })
}

// 封装post请求
function post (url, data = {}) {
  // 默认配置
  let sendObject = {
    url: url,
    method: 'post',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    data: data
  }
  return service(sendObject)
}

// 封装put方法 (resfulAPI常用)
function put (url, data = {}) {
  return service({
    url: url,
    method: 'put',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    data: JSON.stringify(data)
  })
}

// 不要忘记export
export default {
  get,
  post,
  put,
  baseURL
}
