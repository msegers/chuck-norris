const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(require('./webpack.config.common.js'), {
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '..', 'src', 'index.html')
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: ['app', 'vendor', 'polyfills']
        })
    ]
});