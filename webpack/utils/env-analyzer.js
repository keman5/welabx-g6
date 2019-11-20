/*!
 * @author claude
 * date 07/05/2019
 * 解析 webpack 命令行参数
 * npm run dev --param
 */

const { original } = JSON.parse(process.env.npm_config_argv);

const envConfig = {
    excludes:  [],  // dev 时忽略的项目
    envParams: {}, // 命令行参数集合
    devMode:   process.env.NODE_ENV !== 'production',
};

// 非 prod 环境才可以忽略文件夹
if (process.env.npm_lifecycle_event !== 'prod') {

    // 获取 xx=xx 参数
    original.slice(2).forEach(item => {
        const param = item.replace(/^--/, '');
        const [key, value] = param.split('=');

        envConfig.envParams[key] = value || '';
    });

    // 按文件夹读取子项目的配置文件
    /* const modules = readdirSync(resolve('../../src/modules'));

    modules.forEach(item => {
        const module = envjs[item.toLowerCase()];

        if (module) {
            if (module.watch === false) {
                // 排除监听的路径
                envConfig.excludes.push(resolve(`../../src/${item}`));
            }
        }
    }); */
}

module.exports = envConfig;
