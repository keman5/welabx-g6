export default {
    props: {
        data: {
            type:    Array,
            default: () => {
                return [];
            },
        },
        showPage: {
            type:    Boolean,
            default: true,
        },
        pageSize: [String, Number],
        total:    [String, Number],
    },
    data () {
        return {

        };
    },
    methods: {
        changePage (page) {
            this.$emit('change-page', page);
        },
    },
};
