import axios from 'axios'

// const url = "http://106.54.54.237:8000/api/v1" || "http://123.207.32.32:8000/api/w1"||"http://123.207.32.32:8000";
const url = "http://123.207.32.32:8000/api/w1" ;
export function request(config) {
  // 1、创建axios实例
  const instance = axios.create({
    baseURL: url
  });

  //2.axios的拦截器
  // 2、axios的请求拦截器
  instance.interceptors.request.use(
    req => {
      return req;
    },
    err => {
      // return Promise.reject(err);
    }
  );

  // 3、axios的响应拦截器
  instance.interceptors.response.use(
    res => {
      return res.data;
    },
    err => {
      // return Promise.reject(err);
    }
  );
//返回的是一个Promise，要.then()
  return instance(config)

}
