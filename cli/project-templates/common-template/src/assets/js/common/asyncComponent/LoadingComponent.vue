<template>
    <div
        v-loading="true"
        class="component-loading"
    />
</template>

<style lang="scss">
    .component-loading {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        .el-loading-mask {
            z-index: 200;
        }
    }
</style>
