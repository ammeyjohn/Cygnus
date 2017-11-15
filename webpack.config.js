'use strict';

const path = require('path');
const webpack = require('webpack');

// Plugins
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    entry: {
        main: './src/main.js',
        vendor: './src/vendor.js'
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
            loader: 'vue-loader',
            options: {
                loaders: {
                    scss: ExtractTextPlugin.extract({
                        use: ['css-loader', 'sass-loader'],
                        fallback: 'vue-style-loader'
                    }),
                    css: ExtractTextPlugin.extract({
                        use: ['css-loader'],
                        fallback: 'vue-style-loader'
                    })
                }
            }
        }, {
            test: /\.js$/,
            loader: 'babel-loader',
            include: [path.resolve(__dirname, 'src')]
        }, {
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
                // use: ['css-loader?minimize'],
                use: ['css-loader'],
                fallback: 'style-loader'
            })
        }, {
            test: /\.scss$/,
            use: ExtractTextPlugin.extract({
                use: ['sass-loader'],
                fallback: 'style-loader'
            })
        }, {
            test: /\.(html)$/,
            loader: 'html-loader'
        }, {
            test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
            use: [{
                loader: 'url-loader',
                options: {
                    limit: 10240,
                    name: 'assets/images/[name].[ext]'
                }
            }]
        }, {
            test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
            use: [{
                loader: 'url-loader',
                options: {
                    limit: 10240,
                    name: 'assets/fonts/[name].[ext]'
                }
            }]
        }]
    },
    plugins: [
        // new BundleAnalyzerPlugin(),
        // new webpack.DefinePlugin({
        //     'process.env.NODE_ENV': 'development'
        // }),
        // new CleanWebpackPlugin(['dist'], {
        //     root: __dirname,
        //     verbose: true
        // }),
        // new CopyWebpackPlugin([{
        //     from: './src/assets',
        //     to: 'assets'
        // }]),
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
            minChunks: Infinity
        }),
        new webpack.optimize.CommonsChunkPlugin({
            minChunks: 3,
            children: true,
            async: true
        }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        })
    ],
    resolve: {
        extensions: ['.js', '.vue', '.scss'],
        alias: {
            'vue': 'vue/dist/vue.common',
            'jquery': 'jquery'
        }
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        inline: true,
        historyApiFallback: true
    }
}