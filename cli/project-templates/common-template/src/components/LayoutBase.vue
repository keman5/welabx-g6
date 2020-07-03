<template>
    <el-container :class="{'side-collapsed': isCollapsed }">
        <!-- 侧边栏开始 -->
        <layout-side :is-collapsed="isCollapsed" />
        <!-- 侧边栏结束 -->

        <el-container style="margin-left: 200px">
            <!-- 头部开始 -->
            <el-header ref="layout-header">
                <layout-header />
            </el-header>
            <!-- 头部结束 -->

            <!-- 主体开始 -->
            <el-main class="layout-main">
                <div class="base-wrapper">
                    <transition name="fade">
                        <!-- <keep-alive /> -->
                        <router-view v-if="isRouterAlive" />
                    </transition>
                </div>
            </el-main>
            <!-- 主体结束 -->
        </el-container>
    </el-container>
</template>

<script>
    import LayoutSide from '../components/LayoutSide/LayoutSide.vue';
    import LayoutHeader from '../components/LayoutHeader.vue';

    export default {
        name:       'App',
        components: {
            LayoutSide,
            LayoutHeader,
        },
        provide() {
            return {
                refresh: this.refresh,
            };
        },
        data() {
            return {
                isRouterAlive: true,
                isCollapsed:   false,
                loading:       true,
            };
        },
        created() {
            this.$nextTick(() => {
                this.loading = false;
            });

            // 左侧菜单折叠状态
            this.isCollapsed = window.localStorage.getItem('AsideCollapsed');

            this.$bus.$on('collapseChanged', asideCollapsed => {
                this.isCollapsed = asideCollapsed;
                window.localStorage.setItem('AsideCollapsed', asideCollapsed);
            });
        },
        /* mounted() {
            const { $el } = this.$refs['layout-header'];

            window.addEventListener('scroll', () => {
                const { scrollTop } = document.documentElement;

                if(scrollTop >= 120) {
                    $el.style.top = '-120px';
                } else {
                    $el.style.top = 0;
                }
            });
        }, */
        methods: {
            refresh() {
                this.isRouterAlive = false;
                this.$nextTick(() => {
                    this.isRouterAlive = true;
                });
            },
        },
    };
</script>

<style lang="scss">
    @import '@assets/styles/_variable';

    .el-header {
        color: #000;
        position: fixed;
        top: 0;
        right: 0;
        left: 200px;
        z-index: 200;
        background: $header-background;
        border-bottom: 1px solid $border-color-base;
    }
    .layout-main{
        position: relative;
        padding: 84px 20px 20px;
    }
    .id{
        color: #999;
        font-weight: 100;
        font-size: 12px;
    }
</style>
