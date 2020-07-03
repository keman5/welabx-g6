/**
 * @author claude
 * date 07/05/2019
 * 解析地址栏参数
 * @returns {Object}
 */

export const mapQuery = () => {
    const search = location.search;

    const result = {};

    if (search.length < 2) {
        return false;
    } else {
        const query = search.substring(1);

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

export const query = mapQuery();
