/**
 * 公共指令
 */

// 按钮权限
export const btnPermission = {
    inserted(el, bindings, vnode) {
        const value = bindings.value;

        // 在vuex中查看是否有按钮权限
        const flag = vnode.context.$store.state.wesecurity.btnPermission[value];

        // 如果没有权限则将按钮直接删除
        !flag && el.parentNode.removeChild(el);
    },
};
