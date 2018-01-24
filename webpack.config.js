module.exports = {
    entry: __dirname + '/app/client/index.js',
    output: {
        path: __dirname + '/public/',
        filename: 'script.js'
    },
    module: {
        loaders: [{
            test: /\.js$/,
            loaders: 'babel-loader',
            query: {
                presets: ['react']
            }
        }]
    }
};