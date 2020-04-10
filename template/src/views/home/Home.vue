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
                <div class="header-info">yaser.lin</div>
            </el-header>
            <el-main class="main">
                <router-view />
            </el-main>
        </el-container>
    </el-container>
</template>
<style lang="scss">
    @import './_home.scss';
</style>
<script src="./_home.js"></script>
