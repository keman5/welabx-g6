<template>
    <ul>
        <template v-for="item in menuList">
            <template v-if="item.meta.permission && !item.meta.asOneMenu && item.children && item.children.length">
                <el-submenu
                    :key="item.meta.menuCode"
                    :index="item.meta.menuCode"
                >
                    <template slot="title">{{ item.meta.menuName }}</template>
                    <menu-list :menu-list="item.children" />
                </el-submenu>
            </template>
            <!-- 合并二级菜单 -->
            <el-menu-item
                v-else-if="item.meta.permission && item.meta.asOneMenu && item.children && item.children.length"
                :key="item.children[0].meta.menuCode"
                :index="item.children[0].meta.menuCode"
            >
                <router-link
                    class="menu-link"
                    :to="{name: item.children[0].meta.menuCode}"
                >
                    {{ item.children[0].meta.menuName }}
                </router-link>
            </el-menu-item>
            <el-menu-item
                v-else-if="item.meta.permission"
                :key="item.meta.menuCode"
                :index="item.meta.menuCode"
            >
                <router-link
                    class="menu-link"
                    :to="{name: item.meta.menuCode}"
                >
                    {{ item.meta.menuName }}
                </router-link>
            </el-menu-item>
        </template>
    </ul>
</template>

<script>
export default {
    name:  'MenuList',
    props: {
        menuList: {
            type:    Array,
            default: () => [],
        },
    },
};
</script>
