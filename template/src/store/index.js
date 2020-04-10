import Vue from 'vue';
import Vuex from 'vuex';
import { handleCookies } from '../services/common';
Vue.use(Vuex);

const state = {};

const actions = {
    updateStoreState: ({ commit, state }, data) => {
        if (data && typeof data === 'object') {
            for (const key in data) {
                state[key] = data[key];
            }
        } else {
            console.error(data);
            throw new Error('the param you input is not a object !!!');
        }
    },
    add2SessionStorage: ({ commit, state }, data) => { // 添加到sessionStorage
        if (data && typeof data === 'object') {
            for (const key in data) {
                sessionStorage.setItem('' + key, data[key] || '');
            }
        } else {
            console.error(data);
            throw new Error('the param you input is not a object !!!');
        }
    },
    add2SessionAndUpdateState: ({ commit, state }, data) => { // 添加到sessionStorage
        if (data && typeof data === 'object') {
            for (const key in data) {
                state[key] = data[key];
                sessionStorage.setItem('' + key, data[key] || '');
            }
        } else {
            console.error(data);
            throw new Error('the param you input is not a object !!!');
        }
    },
};

const getters = {
    btnAuthority: (state) => (btnName) => {
        const btnList = handleCookies.getCookie('btnList');

        if(btnList && btnList.indexOf(btnName) > -1) {
            return true;
        }
        return false;
    },
};

export default new Vuex.Store({
    state,
    actions,
    getters,
    modules: {

    },
});
