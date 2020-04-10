<template>
    <ul>
        <template v-for="item in menuList">
            <template v-if="item.meta.permission && item.children && item.children.length">
                <el-submenu :index="item.meta.menuCode" :key="item.meta.menuCode">
                    <template slot="title">{{item.meta.menuName}}</template>
                    <menu-list :menu-list="item.children"></menu-list> 
                </el-submenu>
            </template>
            <el-menu-item v-else-if="item.meta.permission" :index="item.meta.menuCode" :key="item.meta.menuCode">
                <router-link class="menu-link" :to="{name: item.meta.menuCode}">
                    {{item.meta.menuName}}
                </router-link>
            </el-menu-item>
        </template>
    </ul>
</template>
<script>
export default {
    name: 'MenuList',
    props: {
        menuList: {
            type: Array,
            default: () => [],
        }
    },
}
</script>