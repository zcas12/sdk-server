const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
    entry: {
        main : ['./src/index.js']
    },
    output: {
        path: path.resolve(__dirname, 'js'),
        filename: 'index.js',
        library: 'BRPay',
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    plugins: [
    ],
    externals: {
    }
};

module.exports = config;