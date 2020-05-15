<template>
    <el-container class="home">
        <el-aside class="aside">
            <h1 class="system-name">
                <img
                    src="../../assets/logo.png"
                    class="logo"
                > 大禹
            </h1>
            <we-menu />
        </el-aside>
        <el-container>
            <el-header class="header">
                <div class="header-info">{{userName}}</div>
            </el-header>
            <el-main class="main">
                <router-view />
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
import Menu from '../../components/menu/Menu';

export default {
    components: {
        'we-menu': Menu,
    },
    data () {
        return {
            userName: ''
        };
    },
    mounted () {
        this.userName = handleCookies.getCookie(`${window.sysCode}-username`);
    },
    methods: {

    },
};
</script>

<style lang="scss">
@import '../../scss/color';
.home {
    height: 100%;
    .aside {
        width: 180px !important;
        background-color: $aside-bg;
        box-shadow: $aside-box-shadow;
        .system-name {
            height: 35px;
            line-height: 35px;
            padding-left: 10px;
            font-size: 16px;
            color: $system-name-text;
            background-color: $title-bg;
            border-bottom: 1px solid $title-border;
            .logo {
                display: inline-block;
                height: 20px;
                margin-bottom: -4px;
                background-color: rgba(#fff,.6);
                border-radius: 50%;
            }
        }
    }
    .header {
        height: 35px !important;
        line-height: 35px;
        box-shadow: $header-box-shadow;
        .header-info {
            text-align: right;
        }
    }
    .main {
        position: relative;
        padding: 15px;
    }
    .label {
        font-size: 12px;
        height: 30px;
        line-height: 30px;
    }
    .el-form-item__label {
        height: 30px;
        line-height: 30px;
        font-size: 12px;
    }
    .operation-btn {
        margin-left: 3px;
        padding: 5px 7px;
        & + .operation-btn {
            margin-left: 0;
        }
    }
}
</style>
