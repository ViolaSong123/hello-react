// axios封装
import axios from "axios";
import store from "@/store";
// import { historyAlpha } from "@/App";
import localStore from "@/utils/localStore";
import loginFn from "@/utils/methods/login";
import { Redirect } from "react-router-dom";

const isDev = process.env.NODE_ENV === "development";

class Http {
  instance = null;
  constructor() {
    this.init();
  }
  init() {
    // 创建axios 实例
    this.instance = axios.create({
      baseURL: isDev ? "/api" : "http://zhoup.top:7003/",
      timeout: 10000,
    });
    this.instance.defaults.withCredentials = true;
    // 拦截器
    this.instance.interceptors.request.use(
      function (config) {
        // TODO 请求头需要添加token
        return config;
      },
      function (error) {
        return Promise.reject(error);
      }
    );
    // 响应器
    this.instance.interceptors.response.use(
      function (res) {
        const {
          data: { code },
        } = res;
        if (code === 200) {
          return res.data;
        } else {
          return Promise.reject(res.data);
        }
      },
      function (error) {
        const {
          data: { code, msg },
        } = error.response;
        switch (code) {
          case 301: //未登录或登录token失效
            notLoginHandler();
            return Promise.reject(msg);
          case 400:
            return Promise.reject(false);
          default:
            return "系统异常";
        }
      }
    );
  }
  get(url, params = {}) {
    return this.instance.get(url, {
      params,
    });
  }
  post(url, data = {}) {
    return this.instance.post(url, data);
  }
}

function notLoginHandler() {
  const userInfo = store.getState().user;
  const localUser = localStore.get("user");
  const { phone, password, remember } = localUser;
  // 未登录情况下
  if (userInfo?.token == undefined) {
    // historyAlpha.history.replace('/')
    <Redirect to="/" />;
  } else {
    // token过期的情况
    // loginFn.logout(historyAlpha.history.replace('/'));
    <Redirect to="/" />;
    // 记住密码情况下

    if (remember) {
      loginFn.login({ phone, password });
    }
  }
}
export default new Http();
