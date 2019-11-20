module.exports = {
    presets: ['@vue/app'],
    plugins: ['@babel/plugin-transform-runtime',
        [
            'component',
            {
                styleLibraryName: '~node_modules/element-ui/lib/theme-chalk',
            },
        ],
    ],
};
