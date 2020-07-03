<template>
    <div id="app">
        <router-view />
    </div>
</template>

<script>
  export default {
    name: 'App',
  };
</script>

<style lang="scss">
    @import '@assets/styles/_variable';
    #app {
        height: 100%;
        background: $layout-main-background;
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }
</style>
