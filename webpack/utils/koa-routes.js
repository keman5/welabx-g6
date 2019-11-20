const Router = require('koa-router');
const router = new Router();

router
    .post('/user/login', async (ctx) => {
        console.log('ctx.request');

        async function delay(time) {
            return new Promise(function (resolve) {
                setTimeout(function () {
                    resolve();
                    ctx.status = 200;
                    ctx.body = {
                        code: 0,
                        msg: 'hello',
                    };
                }, time);
            });
        }

        await delay(1000);

    });

module.exports = router;
