var path = require('path');

// vue.config.js
module.exports = {
    css: {
        loaderOptions: {
            sass: {
                prependData: '@import "./public/scss/main.scss";'
            }
        }
    },
    configureWebpack: {
        resolve: {
            alias: {
                '@public': path.resolve(__dirname, 'public'),
                '@scss': path.resolve(__dirname, 'public/scss'),
                '@css': path.resolve(__dirname, 'public/css'),
                '@coms': path.resolve(__dirname, 'src/components'),
                '@views': path.resolve(__dirname, 'src/views'),
            }
        },
        
    }
}