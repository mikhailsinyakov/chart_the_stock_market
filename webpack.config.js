module.exports = {
    entry: './app/client/index.js',
    output: {
        path: __dirname + '/public/',
        filename: 'script.js'
    },
    module: {
        rules: [{
            use: 'babel-loader'
        }]
    }
};