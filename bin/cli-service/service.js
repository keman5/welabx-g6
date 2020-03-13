class Service{
    constructor() {
        // 当前项目路径
        this.cwd = process.cwd();
    }

    async run (name) {
        const fn = require(`../commands/${name}.js`);
        await fn();
    }
}

module.exports = Service;
