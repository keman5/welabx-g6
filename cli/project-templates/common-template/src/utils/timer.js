/*!
 * @author claude
 * date 07/05/2019
 * 公共时间相关
 */

export const interval = () => {

};

/**
 * 时间格式化
 * @param {Number} interval seconds
 * @param {String} format
 */
export const timerFormat = (interval, format = 'D天 HH小时MM分钟SS秒') => {
    // const noSpace = /(^\s+)|(\s+$)/g;
    const seconds = interval;
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const day = Math.floor(hours / 60);

    const map = {
        D: day,
        H: hours % 24,
        M: minutes % 60,
        S: Math.floor(seconds % 60),
    };

    return format.replace(/(([DHMS])+)/g, (all, t1, t2) => {
        return t1.length > 1 ? `0${map[t2] || 0}`.substr(-2) : (map[t2] || 0);
    });
};
