const path = require('path');
const webpack = require('webpack');

// Plugins
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const Merge = require('webpack-merge');
const CommonConfig = require('./webpack.common.js');

module.exports = Merge(CommonConfig, {
    output: {
        filename: 'js/[name].js',
        chunkFilename: 'js/[name].chunk.js'
    },
    plugins: [
        // new BundleAnalyzerPlugin()
    ],
    devtool: 'inline-source-map',
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        inline: true,
        historyApiFallback: true
    }
});