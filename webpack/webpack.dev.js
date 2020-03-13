/**
 * @author claude
 * date 07/05/2019
 * webpack dev 配置
 */

const webpack = require('webpack');
const envFile = require('dotenv-extended').load({
    path: `${process.env.INIT_CWD}/.env`,
});
// 默认编译 test
const STAGE = JSON.parse(process.env.npm_config_argv).cooked[2] || 'test';
const { coreConfig, userConfig } = require('./webpack.common');
const env = {};

for (const key in envFile) {
    env[key] = JSON.stringify(envFile[key]);
}

coreConfig
    // 热更新
    .plugin('HotModuleReplacement')
        .use(webpack.HotModuleReplacementPlugin)
        .end()
    // 注入环境变量
    .plugin('definePlugin')
        .use(webpack.DefinePlugin, [{
            'process': {
                env: {
                    ...env,
                    STAGE,
                },
            },
        }])
        .end()

module.exports = {
    coreConfig,
    userConfig,
};
