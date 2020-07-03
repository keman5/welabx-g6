/*!
 * @author claude
 * date 07/05/2019
 * 兼容 requestAnimationFrame
 */

(function () {
    let lastTime = 0;

    const vendors = ['ms', 'moz', 'webkit', 'o'];

    for (let x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame']
            || window[vendors[x] + 'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function (callback) {
            const currTime = new Date().getTime();

            const timeToCall = Math.max(0, 16 - (currTime - lastTime));

            const id = window.setTimeout(function () { callback(currTime + timeToCall); },
                timeToCall);

            lastTime = currTime + timeToCall;
            return id;
        };

    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function (id) {
            clearTimeout(id);
        };
}());
