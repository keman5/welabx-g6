/*!
 * @author claude
 * date 07/05/2019
 * http 初始化
 * 初始化全局loading, 请求拦截, 响应
 */

// 要使用 0.18 版本  高版本会过滤掉自定义入参导致很多逻辑没法处理
import axios from 'axios';
import { query, handleCookies, deepMerge } from '../common';

const cancelTokenQueue = {}; // 取消请求 token 队列
// 创建 axios 实例
const httpInstance = axios.create({
    baseURL: '',
    timeout: 7000, // 请求超时 7s
    headers: {}, // 公共请求头
    // withCredentials: true,
    // responseType: 'json', // default
    // responseEncoding: 'utf8', // default
    // xsrfCookieName: 'XSRF-TOKEN', // default
    // xsrfHeaderName: 'X-XSRF-TOKEN', // default
});

// 请求拦截器
httpInstance.interceptors.request.use(config => {

    if (config.url.indexOf('http://') === -1 && config.url.indexOf('https://') === -1) {
        // 带请求前缀或 window.api
        if (config.apiPrefix !== false && config.apiPrefix !== '') {
            // 需要带全局前缀
            config.url = window.api + process.env.API_PREFIX + config.url;
        } else {
            // 不带全局前缀
            config.url = window.api + config.url;
        }
    }

    // 发送请求前判断是否登录
    /* if (!store.getters.isLogin && config.isLogin) {
        // 先取消所有请求
        for (const key in cancelTokenQueue) {
            cancelTokenQueue[key].cancel();
        }
        // 跳转到登录页
        baseLogout();
    } */
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
            if (data && data.code !== 200 && data.message) {
                window.$app.$message.error(data.message);
                return false;
            }
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
                        $message.error('对不起，登录超时，请重新登录');
                        location.replace(window.loginLink);
                        break;
                    case 403:
                        // 登录信息失效 自动跳转登录
                        $message.error('对不起，您没有该功能的访问权限');
                        setTimeout(() => {
                            location.replace(window.tagLink);
                        }, 500);
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
        return false;
    },
);

/**
 * 公共service方法
 * @param {*} config 实际传入的参数
 */
let loadingCount = 0; // loading 层计数
const btnQueue = {};  // 请求按钮队列
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
        isLogin: true,
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
    if (options.headers !== false) {
        options.headers = {
            Authorization: query.token || handleCookies.getCookie('token') || '',
            sysCode:       query.sysCode || handleCookies.getCookie('sysCode') || '',
        };
    }

    // 添加全局 loading
    const loadingInstance = policy.loading(options);

    // 调用 httpInstance
    return new Promise((resolve, reject) => {
        httpInstance({ ...options })
            .then(res => {
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
