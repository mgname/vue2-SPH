// 对于axios进行二次封装
import axios from "axios"
// 引入进度条
import nprogress from "nprogress"
// 引入进度条样式
import 'nprogress/nprogress.css'

// 1.利用axios对象的方法create，创建一个axios实例
const requests = axios.create({
  // 配置对象
  // 基础路径，发请求的时候，路径中会出现api
  baseURL: '/mock',
  // 代表请求超时的时间5s
  timeout: 5000
})

// 请求拦截器
requests.interceptors.request.use((config) => {
  // config：配置对象，对象中有headers

  // 进度条开始
  nprogress.start()
  return config
})
// 响应拦截器
requests.interceptors.response.use((res) => {

  // 成功的回调

  // 进度条结束
  nprogress.done()
  return res.data
}, (err) => {
  // 失败的回调
  return Promise.reject(new Error('fail'))
})

// 对外暴露
export default requests