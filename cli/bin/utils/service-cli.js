const buildIn = ['help', 'create', 'dev', 'build'];

class Service{
    constructor() {
        // 当前项目路径
        this.cwd = process.cwd();
        this.commands = {};
    }

    // 注册插件并添加帮助信息和回调
    registCommand (command) {

    }

    // 输出帮助信息
    logHelpInfo () {

    }

    async run (command) {
        if (buildIn.includes(command)) {
            const fn = require(`../commands/${command}.js`);
            await fn(this);
        } else {
            console.log('\n[未知命令]');
        }
    }
}

module.exports = Service;
