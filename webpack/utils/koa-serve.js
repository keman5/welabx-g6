/*!
 * @author claude
 * date 07/05/2019
 * 用于本地服务
 */

const fs = require('fs');
const Koa = require('koa');
const path = require('path');
const compress = require('koa-compress');
const { promisify } = require('util');
const stat = promisify(fs.stat);
const mime = require('mime/lite');
const router = require('./koa-routes');
const proxy = require('koa-proxy');
const env = require('../../env');
const app = new Koa();

const indexPath = async (ctx) => {
    //如果不是文件，则判断是否存在index.html
    const filename = path.join(__dirname, '../../dist/index.html');

    await stat(filename);

    ctx.set('Content-Type', 'text/html;charset=utf-8');
    ctx.body = fs.createReadStream(filename);
};

const staticPath = (dir) => {
    return async (ctx) => {
        const _ctx = ctx;
        const pathname = ctx.path;

        //获取请求文件的绝对路径
        const realPath = path.join(dir, pathname);

        try {
            const statObj = await stat(realPath);

            if (statObj.isFile()) {
                //如果是文件则读取文件，并且设置好相应的响应头
                ctx.set('Content-Type', `${mime.getType(realPath)};charset=utf-8`);

                _ctx.body = fs.createReadStream(realPath);
            } else {
                await indexPath(ctx);
            }
        } catch (e) {
            await indexPath(ctx);
        }
    };
};

// 接口代理
router
    .all(/^\/prefix-api/, proxy({
        host: app.env === 'development' ? env.API_DEV : env.API_PROD,
        map:  (path) => path.split('/prefix-api')[1],
    }));

app
    .use(compress({
        threshold: 2048,
    }))
    .use(router.routes())
    .use(router.allowedMethods())
    .use(staticPath(path.resolve(__dirname, '../../dist/')));

app.listen('8081', () => {
    console.log('服务器正在运行在 8081 端口上...');
});
