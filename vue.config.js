module.exports = {
    lintOnSave: false,
    publicPath: './',
    productionSourceMap: false,
    configureWebpack: {
        externals: {
            vue: 'Vue',
            axios: 'axios',
            'vue-router': 'VueRouter',
            vuex: 'Vuex'
        }
    },
}