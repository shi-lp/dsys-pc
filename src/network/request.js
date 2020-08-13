import axios from 'axios'

export function request (config) {
  const instance = axios.create({
    baseURL: 'http://localhost:8002/',
    timeout: 999999,
    headers: {
      'Content-Type': 'application/json;charset=utf-8' // 头部信息
    }
  })

  // http request 拦截器
  instance.interceptors.request.use(config => {
    // if (localStorage.token) { // 判断token是否存在
    //   config.headers.Authorization = localStorage.token // 将token设置成请求头
    // }
    return config
  }, err => {
    console.log(err)
    // return Promise.reject(err)
  })

  // http response 拦截器
  instance.interceptors.response.use(response => {
    // if (response.data.errno === 999) {
    //   console.log('token过期')
    // }
    return response.data
  }, err => {
    console.log(err)
    // return Promise.reject(err)
  })
  return instance(config)
}
