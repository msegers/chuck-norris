const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
    devtool: 'inline-source-map',
    entry: {
        polyfills: path.resolve(__dirname, '..', 'src/polyfills'),
        vendor: path.resolve(__dirname, '..', 'src/vendor.ts'),
        app: path.resolve(__dirname, '..', 'src/main.ts')
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, '..', 'dist')
    },
    module: {
        rules: [
            { test: /\.ts$/, use: ['ts-loader', 'angular2-template-loader'] },
            { test: /\.html$/, use: 'html-loader' },
        ]
    },
    plugins: [
        // Workaround for angular/angular#11580
        new webpack.ContextReplacementPlugin(
            // The (\\|\/) piece accounts for path separators in *nix and Windows
            /(.+)?angular(\\|\/)core(.+)?/,
            path.resolve(__dirname, '..', 'src'), // location of your src
            {} // a map of your routes
        ),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '..', 'src', 'index.html')
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: ['app', 'vendor', 'polyfills']
        })
    ],
    resolve: {
        extensions: ['.ts', '.js']
    }
};