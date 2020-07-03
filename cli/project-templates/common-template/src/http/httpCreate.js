/*!
 * @author claude
 * date 07/05/2019
 * http 初始化
 * 初始化全局loading, 请求拦截, 响应
 */

import axios from 'axios';
// 要使用 0.18 版本  高版本会过滤掉自定义入参导致很多逻辑没法处理
// import env from '@/env.js';
// import store from '@js/store/store';
import { baseLogout } from '@src/router/auth';
import { deepMerge } from '@src/utils/types';

const cancelTokenQueue = {}; // 取消请求 token 队列
// 创建 axios 实例
const httpInstance = axios.create({
    baseURL: '',
    timeout: 1000 * 60, // 请求超时 60s
    headers: {}, // 公共请求头
    // withCredentials: true,
    // responseType: 'json', // default
    // responseEncoding: 'utf8', // default
    // xsrfCookieName: 'XSRF-TOKEN', // default
    // xsrfHeaderName: 'X-XSRF-TOKEN', // default
});

// 请求拦截器
httpInstance.interceptors.request.use(config => {
    // console.log('config:', config);
    // 在这里处理默认请求头等配置
    // 如: config.timeout = 1000;
    config.baseURL = window.api.baseUrl;
    // 发送请求前判断是否登录
    if (config.isLogin) {
        // 先取消所有请求
        for (const key in cancelTokenQueue) {
            cancelTokenQueue[key].cancel();
        }
        // 跳转到登录页
        baseLogout();
    }
    return config;
}, error => {
    window.$app.$message.error(error);
    return {
        msg: error,
    };
});

// 响应拦截器
httpInstance.interceptors.response.use(
    response => {
        // console.log('response:', response);
        const { config, data } = response;

        // 登录信息失效或需要重新登录
        /* if (data.redirect) {
            // 跳转到登录页
            baseLogout();
        } */
        // 全局错误处理
        if (config.systemError !== false) {
            if (data && data.code !== 0) {
                window.$app.$message.error(data.message || '未知错误!');
            }
        }

        // 请求成功 将结果返回给前台
        if (data.code == null) {
            // 对非标准接口返回值进行转换
            return {
                code: 0,
                data,
            };
        }
        return data;
    },
    result => {
        const { $message } = window.$app;
        const { code, response, isCancel, systemError, message } = result;

        if (systemError !== false) {
            if (isCancel) {
                // 主动取消弹窗提示
                const msg = isCancel.msg ? `Cancel menually: ${isCancel.msg}` : 'Cancel menually';

                $message.error(msg);
                return {
                    code: 'canceled',
                    msg,
                };
            } else if (code === 'ECONNABORTED') {
                // 捕获错误处理
                const msg = 'request timeout !';

                $message.error(msg);
                return {
                    code: 'timeout',
                    msg,
                };
            } else if (response) {
                // 全局错误处理
                const status = +response.status;
                const msg = `${status}: ${response.statusText}`;

                switch (status) {
                    case 401:
                        // 登录信息失效 自动跳转登录
                        $message.error('登录已过期, 请重新登录');
                        baseLogout();
                        break;
                        /* case 504:
                            $message.error(msg);
                            break; */
                    default:
                        $message.error(msg);
                }
                return {
                    code: status,
                    msg,
                };
            } else if (message) {
                // 跨域, 网络错误等情况
                $message.error(message);
            }
        }
        // 防止前台报错
        return {
            code: 1,
            msg:  message,
        };
    },
);

/**
 * 公共service方法
 * @param {*} config 实际传入的参数
 */
let loadingCount = 0; // loading 层计数
const btnQueue = {}; // 请求按钮队列
const policy = {
    isCancel(options, state, msg) {
        if (state === true) {
            const cancelToken = cancelTokenQueue[`${options.url}`];

            if (cancelToken) {
                cancelToken.cancel();
                if (msg) {
                    window.$app.$message.error(msg);
                }
            }
        } else if (state === 'all') {
            // 取消所有请求
            for (const key in cancelTokenQueue) {
                cancelTokenQueue[key].cancel();
            }
        }
    },
    urlTail(options) {
        if (options.urltail) {
            const { url, urltail } = options;

            options.url = `${url}/${urltail.substr(0, 1) === '/' ? urltail.substr(1) : urltail}`;
        }
    },
    btnState(btnState) {
        if (!btnState || !btnState.target) return;

        let srcElement = btnState.target.srcElement;

        if (srcElement.nodeName !== 'BUTTON') {
            while (srcElement.nodeName !== 'BUTTON') {
                srcElement = srcElement.parentElement;
            }
        }

        if (!srcElement) return false;

        const locker = srcElement.getAttribute('locker');

        if (!locker) {
            if (btnState.type !== false) {
                srcElement.classList.add('is-loading');
                srcElement.setAttribute('locker', +Date.now());
                // 插入 loading 元素
                const icon = document.createElement('i');

                icon.classList.add('el-icon-loading');
                srcElement.insertBefore(icon, srcElement.children[0]);
                // 将按钮加入队列
                btnQueue[locker] = srcElement;
            }
        } else {
            // 阻止重复请求
            return false;
        }

        return srcElement;
    },
    loading(options) {
        let loadingInstance = null;

        if (options.loading && loadingCount === 0) {
            delete options.loading;
            loadingInstance = window.$app.$loading({ fullscreen: true });
            loadingCount++;
        }
        return loadingInstance;
    },
};

const baseService = (config = {}) => {

    const options = deepMerge({
        loading: false,
        isLogin: false,
    }, config);

    // 保存 cancelToken 队列
    const { isCancel } = options;

    policy.isCancel(options, isCancel);
    if (isCancel && isCancel.state) {
        policy.isCancel(options, isCancel.state, isCancel.msg);
    }

    const source = axios.CancelToken.source();

    cancelTokenQueue[`${options.url}`] = source;
    options.cancelToken = source.token;

    // 添加尾部 url
    policy.urlTail(options);

    // 自动处理按钮状态
    const srcElement = policy.btnState(config.btnState); // 这里必须传 config

    // 阻止重复请求
    if (srcElement === false) {
        return false;
    }

    // 默认设置 headers
    const { headers } = options;

    if (headers !== false) {
        const userInfo = window.localStorage.getItem('userInfo');

        if (userInfo) {
            options.headers = {
                ...headers,
                token: JSON.parse(userInfo).token,
            };
        }
    }

    // 添加全局 loading
    const loadingInstance = policy.loading(options);

    // 调用 httpInstance
    return new Promise((resolve, reject) => {
        httpInstance({ ...options })
            .then((res) => {
                resolve(res);
            })
            .catch(error => {
                reject(error);
            })
            .finally(() => {

                setTimeout(() => {
                    // 恢复按钮状态
                    if (srcElement) {
                        const locker = srcElement.getAttribute('locker');

                        if (options.btnState.type !== false) {
                            srcElement.classList.remove('is-loading');
                            srcElement.removeChild(srcElement.children[0]);
                        }
                        btnQueue[locker] = null;
                        srcElement.removeAttribute('locker');
                    }

                    // 关闭全局弹窗
                    if (loadingInstance) {
                        loadingCount--;
                        loadingInstance.close();
                    }
                }, 400);
            });
    });
};

export default baseService;
