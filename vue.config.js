module.exports = {
    baseUrl: "./",
    productionSourceMap: false,

    devServer: {
        port: 3000,
    },
    configureWebpack: {
        // 把webpack的配置写在这里 会自动合并
        externals: {
            'vue': 'Vue',
            'vue-router': 'VueRouter',
            'axios': 'axios'
        }
    },
    css: {
        loaderOptions: {
            stylus: {
                'resolve url': true,
                'import': [
                    './src/theme'
                ]
            }
        }
    },
    pluginOptions: {
        'cube-ui': {
            postCompile: true,
            theme: true
        }
    }
}