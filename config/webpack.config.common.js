const webpack = require('webpack');
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
            { test: /\.ts$/, use: ['angular2-template-loader', 'ts-loader'] },
            { test: /\.html$/, use: 'html-loader' },
            { test: /\.ts$/, use: 'tslint-loader', enforce: 'pre' },
            {
                test: /\.css$/,
                include: path.resolve(__dirname, '..', 'src', 'app'),
                loader: ['css-to-string-loader','css-loader']
            }
        ]
    },
    plugins: [
        // Copied from said issue:
        // Workaround for angular/angular#11580
        new webpack.ContextReplacementPlugin(
            // The (\\|\/) piece accounts for path separators in *nix and Windows
            /(.+)?angular(\\|\/)core(.+)?/,
            path.resolve(__dirname, '..', 'src'), // location of your src
            {} // a map of your routes
        )
    ],
    resolve: {
        extensions: ['.ts', '.js']
    }
};