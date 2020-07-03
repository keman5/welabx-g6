import * as types from '../mutationTypes';

const { localStorage } = window;

let userInfo = localStorage.getItem('userInfo');

let tagsList = localStorage.getItem(types.UPDATE_TAGSLIST);

userInfo = userInfo ? JSON.parse(userInfo) : null;
tagsList = tagsList ? JSON.parse(tagsList) : [];

const state = {
    isLogin: Boolean(userInfo), // null: 未登录 true: 已登录 false: 过期
    userInfo,
    tagsList,
};

const getters = {
    isLogin:  state => state.isLogin,
    userInfo: state => state.userInfo,
    tagsList: state => state.tagsList,
    // menuList:      state => state.menuList,
    // btnPermission: state => state.btnPermission,
};

const mutations = {
    [types.UPDATE_USER](state, data) {
        state.userInfo = {
            token:   data.token,
            sysCode: data.sysCode,
            role:    data.role || {},
        };
        state.isLogin = data.token ? true : (data.token == null ? null : false);
    },
    // 更新标签栏
    [types.UPDATE_TAGSLIST] (state, list) {
        state.tagsList = list;
        localStorage.setItem('tagsList', JSON.stringify(list));
    },
    // 更新菜单
    /* [types.UPDATE_MENUS](state, { menuList, btnPermission = {} }) {
        if (menuList) {
            const recursionMenu = (menuList, parentIndex = -1, parentPath) => {
                menuList.forEach((item, index) => {
                    item.index = parentIndex >= 0 ? `${parentIndex}-${index}` : `${index}`;
                    item.meta.index = item.index;
                    if (parentPath != null) {
                        item.path = item.path === '' ? parentPath : `${parentPath === '/' ? '' : parentPath}/${item.path}`;
                    }
                    if (item.children) {
                        recursionMenu(item.children, index, item.path);
                    }
                });

                return menuList;
            };

            state.menuList = recursionMenu(menuList);
            state.btnPermission = btnPermission;
        } else {
            state.menuList = [];
            state.btnPermission = [];
        }
    }, */
};

export default {
    getters,
    mutations,
    state,
};
