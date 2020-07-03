import Element from 'element-ui';

export default {
    install (Vue) {
        Vue.use(Element);

        Vue.prototype.$ELEMENT = { size: 'small' };
    },
};
