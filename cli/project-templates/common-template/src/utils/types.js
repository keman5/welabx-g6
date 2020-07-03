/*!
 * @author claude
 * date 07/05/2019
 * 数据类型转换
 */

/**
 * 是否为空 (空对象/空数组/空字符串)
 * @param {*} (obj / array / string)
 */
export const isEmpty = obj => {
    if (!obj || obj === '' || obj == null) return true;

    if (obj.constructor === Array) {
        // 是数组
        if (obj.length === 0) return true;
    } else {
        // 是对象
        if (Object.keys(obj).length === 0) return true;
    }
    return false;
};

/**
 * 深拷贝
 * @param {Object} obj
 */
export const deepClone = (obj) => {
    if (obj == null) return obj;
    if (obj instanceof Date) return new Date(obj);
    if (obj instanceof RegExp) return new RegExp(obj);
    if (typeof obj !== 'object') return obj;

    // 开始拷贝
    let target = new obj.constructor();

    Object.keys(target).forEach((key) => {
        if (obj.hasOwnProperty(key)) {
            target = deepClone(obj[key]);
        }
    });

    return target;
};

/**
 * 判断 val 是否为数组
 *
 * @param {Object} val
 * @returns {boolean} true/false
 */
export const isArray = (val) => {
    return toString.call(val) === '[object Array]';
};

function forEach(obj, fn) {
    // Don't bother if no value provided
    if (obj === null || typeof obj === 'undefined') {
        return;
    }

    // Force an array if not already something iterable
    if (typeof obj !== 'object') {
        /*eslint no-param-reassign:0*/
        obj = [obj];
    }

    if (isArray(obj)) {
        // Iterate over array values
        for (let i = 0, l = obj.length; i < l; i++) {
            fn.call(null, obj[i], i, obj);
        }
    } else {
        // Iterate over object keys
        for (const key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
                fn.call(null, obj[key], key, obj);
            }
        }
    }
}

/**
 * 合并对象(保留两者所有的属性, 后者覆盖前者)
 * @param {target} obj
 * @param {origin} obj
 */
export const deepMerge = (/* obj1, obj2, obj3, ... */...args) => {
    /* for (const key in origin) {
        target[key] = target[key] && origin[key] !== undefined && origin[key].toString() === '[object Object]' ? deepMerge(target[key], origin[key]) : target[key] = origin[key];
    }
    return target; */
    const result = {};

    function assignValue(val, key) {
        if (typeof result[key] === 'object' && typeof val === 'object') {
            result[key] = deepMerge(result[key], val);
        } else {
            result[key] = val;
        }
    }

    for (let i = 0, l = args.length; i < l; i++) {
        forEach(args[i], assignValue);
    }
    return result;
};
