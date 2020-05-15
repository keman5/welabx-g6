import Cookies from 'js-cookie';

const handleCookies = {
    setCookies: (data) => {
        if (data && typeof data === 'object') {
            for (const key in data) {
                Cookies.set('' + key, data[key] || '');
            }
        } else {
            console.error(data);
            throw new Error('the param you input is not a object !!!');
        }
    },
    getCookie: (value) => {
        return Cookies.get(value);
    },
    getJsonCookie: (value) => {
        return Cookies.getJSON(value);
    },
    // 删除 cookie
    removeCookie: (key) => {
        Cookies.remove(key);
    },
};

const mapQuery = () => {
    const href = location.href;
    const queryIndex = href.indexOf('?');
    const result = {};

    if (queryIndex === -1) {
        return false;
    } else {
        const query = href.substring(queryIndex + 1);
        const queryArr = query.split('&');

        for (const item of queryArr) {
            const eq = item.indexOf('=');

            const key = item.substring(0, eq),
                value = item.substring(eq + 1);

            result[key] = value;
        }
    }
    return result;
};

const query = mapQuery();

/**
 * 判断 val 是否为数组
 *
 * @param {Object} val
 * @returns {boolean} true/false
 */
export const isArray = (val) => {
    return toString.call(val) === '[object Array]';
};

function forEach (obj, fn) {
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

    function assignValue (val, key) {
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

export { handleCookies, query };
