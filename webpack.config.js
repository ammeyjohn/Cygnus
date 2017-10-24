"use strict";

const path = require('path');
const webpack = require('webpack');

// Plugins
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        main: './src/main.js',
        vendor: [
            'vue',
            'iview'
        ]
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/dist/',
        filename: 'js/[name].[hash:4].js',
        chunkFilename: 'js/[name].[chunkhash:4].chunk.js'
    },
    module: {
        rules: [{
            test: /\.vue$/,
            use: "vue-loader"
        }, {
            test: /\.js$/,
            use: "babel-loader",
            include: [path.resolve(__dirname, 'src')]
        }, {
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
                use: ["css-loader"]
            })
        }, {
            test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
            use: [{
                loader: "url-loader",
                options: {
                    limit: 10000,
                    name: 'images/[name].[hash:7].[ext]'
                }
            }]
        }, {
            test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
            use: [{
                loader: "url-loader",
                options: {
                    limit: 10000,
                    name: 'fonts/[name].[hash:7].[ext]'
                }
            }]
        }]
    },
    plugins: [
        // new BundleAnalyzerPlugin(),
        // new webpack.DefinePlugin({
        //     'process.env.NODE_ENV': 'development'
        // }),
        new ExtractTextPlugin({
            filename: 'css/style.css'
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html'
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: ['vendor', 'runtime'],
            minChunks: Infinity
        }),
        new webpack.optimize.CommonsChunkPlugin({
            minChunks: 3,
            children: true,
            async: true
        })
    ],
    resolve: {
        alias: {
            'vue': 'vue/dist/vue.common'
        },
        extensions: ['.js', '.jsx']
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: path.resolve(__dirname, '/dist/'),
        inline: true,
        historyApiFallback: true
    }
}