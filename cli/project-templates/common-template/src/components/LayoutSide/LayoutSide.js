import menuTemp from './MenuTemp.vue';

export default {
    props: {
        isCollapsed: Boolean,
    },
    inject:     ['refresh'],
    components: {
        menuTemp,
    },
    data() {
        return {
            defaultActive: '',
            defaultOpens:  [],
            menuList:      [],
        };
    },
    watch: {
        '$route.path'() {
            this.defaultActive = this.$route.meta.active || this.$route.path;
        },
    },
    created() {
        const currentIndex = `${this.$route.meta.index || 0}`;

        this.$router.options.routes.forEach(route => {
            if (route.meta && !route.meta.requiresLogout) {
                this.menuList.push(route);
            }
        });
        this.defaultActive = this.$route.meta.active || this.$route.path;
        this.defaultOpens = [currentIndex.substring(0, 1), currentIndex];
    },
    methods: {
        menuSelected (index) {
            if (index === this.$route.path) {
                // 刷新当前路由
                this.$nextTick(() => {
                    // this.refresh();
                });
            }
        },
    },
};
