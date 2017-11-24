const path = require('path');
const webpack = require('webpack');

// Plugins
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const Merge = require('webpack-merge');
const CommonConfig = require('./webpack.common.js');

module.exports = Merge(CommonConfig, {
    output: {
        filename: 'js/[name].[hash].js',
        chunkFilename: 'js/[name].chunk.[hash].js'
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new CleanWebpackPlugin(['dist'], {
            root: path.resolve('./'),
            verbose: false
        }),
        new UglifyJSPlugin()
    ]
});