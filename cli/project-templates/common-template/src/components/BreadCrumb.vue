<template>
    <el-breadcrumb
        v-if="menus.length"
        separator="/"
    >
        <template v-for="(item, index) in menus">
            <el-breadcrumb-item
                v-if="index + 1 !== menus.length"
                :key="index"
            >
                <i
                    v-if="item.meta.icon"
                    :class="item.meta.icon"
                />
                {{ item.meta.title }}
            </el-breadcrumb-item>
            <el-breadcrumb-item
                v-else
                :key="index"
            >
                <i
                    v-if="item.meta.icon"
                    :class="item.meta.icon"
                />
                {{ item.meta.title }}
            </el-breadcrumb-item>
        </template>
    </el-breadcrumb>
</template>

<script>
    export default {
        data() {
            return {
                menus: [],
            };
        },
        watch: {
            '$route.path'() {
                this.menus = this.$route.matched;
            },
        },
        created() {
            this.menus = this.$route.matched;
        },
    };
</script>

<style lang="scss">
    .el-breadcrumb {
        padding-bottom: 10px;
        .el-breadcrumb__inner {
            font-weight: bold;
        }
    }
</style>
