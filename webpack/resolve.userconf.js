/**
 * @author claude
 * @date 2020/03/05
 */
const { existsSync } = require('fs');
const rcfile = `${process.env.INIT_CWD}/welabx-cli.conf.js`;

// 查找配置文件
if (existsSync(rcfile)) {
    const userConfig = require(rcfile);

    module.exports = userConfig;
} else {
    module.exports = {};
}
