import MenuList from './MenuList.vue'
export default {
    components: {
        'menu-list': MenuList 
    },
    data() {
        return {
            menuList: [],
            currentMenu: '',
        }
    },
    mounted() {
        this.menuList = this.$router.options.routes;
        this.currentMenu = this.$route.meta.menuCode;
        console.log();
    },
    watch: {
        '$route.path': function (val, oldVal) {
          this.menuActive = this.$route.meta.menuCode;
        }
    },
    methods: {
        
    },
}