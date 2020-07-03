/*!
 * @author claude
 * date 07/05/2019
 * 日期格式化
 */
export const dateFormat = (timestamp, format = 'yyyy-MM-dd hh:mm') => {

    if (!timestamp) {
        return '';
    }

    const $date = new Date(timestamp);

    const map = {
        y: $date.getFullYear(),
        M: $date.getMonth() + 1,
        d: $date.getDate(),
        h: $date.getHours(),
        m: $date.getMinutes(),
        s: $date.getSeconds(),
    };

    return format.replace(/(([yMdhmsT])(\2)*)/g, (all, t1, t2) => {
        const value = map[t2];

        if (t2 === 'y') {
            return `${value}`.substr(4 - t1.length);
        } else if (t2 === 'M' && t1.length > 2) {
            if (t1.length === 3) {
                return dateFormat.months[value - 1].substr(0, 3);
            }
            return dateFormat.months[value - 1];
        }
        return t1.length > 1 ? `0${value}`.substr(-2) : value;
    });
};

/**
 * 返回最近xx时间
 * @param {Number} ms 毫秒
 * @returns {Array: [before, now]}
 */
export const dateLast = (ms, now) => {
    const $now = now || +new Date();
    const before = $now.setTime($now.getTime() - ms);

    return [before, $now];
};
