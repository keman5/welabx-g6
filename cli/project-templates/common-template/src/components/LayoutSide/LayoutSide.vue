<template>
    <div class="layout-sider">
        <div class="heading-logo">
            <img
                width="50px"
                class="logo"
                src="../../assets/images/x-logo.png"
            >
            我的项目
        </div>
        <el-aside style="width: 200px;">
            <el-scrollbar>
                <el-menu
                    router
                    :unique-opened="true"
                    :default-active="defaultActive"
                    :default-openeds="defaultOpens"
                    :collapse="isCollapsed"
                    @select="menuSelected"
                >
                    <menu-temp :menus="menuList" />
                </el-menu>
            </el-scrollbar>
        </el-aside>
    </div>
</template>

<script src="./LayoutSide.js"></script>

<style lang="scss">
    @import '@assets/styles/_variable';

    .layout-sider{
        height: 100vh;
        overflow: auto;
        position: fixed;
        left: 0;
        background: $nav-background;
        .heading-logo{
            color: #fff;
            height: 60px;
            line-height: 60px;
            font-weight: bold;
            background: $nav-background-active;
        }
        .el-menu{
            background: $nav-background;
            border: 0;
        }
        .el-menu-item,
        .el-submenu__title{color: #A6AAAE;}
        .el-menu-item-group__title{display: none;}
        .el-menu-item{
            &.is-active{
                // background: #1B233B !important;
                color: #fff;
                &:after{
                    content: '';
                    position: absolute;
                    top: 0;
                    right: 0;
                    bottom: 0;
                    background: $nav-background-active;
                    width: 3px;
                }
                i{color: #fff;}
                .icon{color: $nav-background-active;}
            }
        }
        .el-menu-item,
        .el-submenu__title{
            &:hover,
            &:focus{
                background: transparent;
                color: #fff;
            }
            i{font-size: 16px;}
            .icon{
                margin-right: 10px;
                margin-top: -4px;
            }
        }
        .el-submenu{
            &.is-active{
                .el-submenu__title{
                    color: #fff;
                    &:after{
                        content: '';
                        position: absolute;
                        top: 0;
                        right: 0;
                        bottom: 0;
                        background: $nav-background-active;
                        width: 3px;
                    }
                    i{color: #fff;}
                    .icon{color: $nav-background-active;}
                }
                .sub-menu-list{background: $sub-menu-list_bg;}
                .el-menu-item:after{display: none;}
            }
        }
    }
</style>
