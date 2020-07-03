/**
 * @author claude
 * date 07/05/2019
 * 公共服务接口
 */
const api = process.env.NODE_ENV === 'development' ? 'http://xbd-dev.wolaidai.com/pangu-app-wesee-service/' : 'http://xbd-dev.wolaidai.com/pangu-app-wesee-service/'; // 'http://172.20.211.164:8080/';

export default {
    /**
     * 用户登录
     */
    serviceLogin: {
        url:     `${api}monitor/login`,
        isLogin: false,
    },
    /**
     * 用户注册
     */
    serviceRegister: {
        url:     `${api}base/register`,
        isLogin: false,
    },
};
