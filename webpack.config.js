'use strict';

const path = require('path');
const webpack = require('webpack');

// Plugins
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        main: './src/main.js',
        vendor: [
            'vue',
            'vue-router',
            'element-ui'
        ]
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
        filename: 'js/[name].js',
        chunkFilename: 'js/[name].chunk.js'
    },
    module: {
        rules: [{
            test: /\.vue$/,
            use: 'vue-loader',
            options: {
                loaders: {
                    scss: ExtractTextPlugin.extract({
                        use: ['css-loader', 'autoprefixer-loader', 'sass-loader'],
                        fallback: 'vue-style-loader'
                    }),
                    css: ExtractTextPlugin.extract({
                        use: ['css-loader', 'autoprefixer-loader'],
                        fallback: 'vue-style-loader'
                    })
                }
            }
        }, {
            test: /\.js$/,
            use: 'babel-loader',
            include: [path.resolve(__dirname, 'src')]
        }, {
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
                use: ['css-loader?minimize', 'autoprefixer-loader'],
                fallback: 'style-loader'
            })
        }, {
            test: /\.scss$/,
            use: ExtractTextPlugin.extract({
                use: ['autoprefixer-loader', 'sass-loader'],
                fallback: 'style-loader'
            })
        }, {
            test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
            use: [{
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'images/[name].[hash:7].[ext]'
                }
            }]
        }, {
            test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
            use: [{
                loader: 'url-loader',
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
            filename: 'css/[name].css',
            allChunks: true
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html'
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: ['vendor', 'runtime'],
            filename: 'vendor.js',
            minChunks: Infinity
        }),
        new webpack.optimize.CommonsChunkPlugin({
            minChunks: 3,
            children: true,
            async: true
        })
    ],
    resolve: {
        extensions: ['.js', '.vue'],
        alias: {
            'vue': 'vue/dist/vue.common'
        }
    },
    devtool: '#source-map',
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        inline: true,
        historyApiFallback: true
    }
}