const path = require('path');
const webpack = require('webpack');

// Plugins
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin');

const prod = process.env.NODE_ENV === 'production' ? true : false;
const CSS_LOADER = 'css-loader' + (prod ? '?minimize' : '');

module.exports = {
    entry: {
        main: './web/main.js',
        vendor: './web/vendor.js'
    },
    output: {
        path: path.resolve('./dist'),
        publicPath: '/'
    },
    module: {
        rules: [{
            test: /\.vue$/,
            loader: 'vue-loader',
            options: {
                loaders: {
                    scss: ExtractTextPlugin.extract({
                        use: [CSS_LOADER, 'sass-loader'],
                        fallback: 'vue-style-loader'
                    }),
                    css: ExtractTextPlugin.extract({
                        use: [CSS_LOADER],
                        fallback: 'vue-style-loader'
                    })
                }
            }
        }, {
            test: /\.js$/,
            loader: 'babel-loader',
            include: [path.resolve(__dirname, 'web')]
        }, {
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
                use: [CSS_LOADER],
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
        new ExtractTextPlugin({
            filename: 'css/[name]' + (prod ? '.[contenthash]' : '') + '.css',
            allChunks: true
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './web/index.html',
            minify: {
                removeComments: prod,
                collapseWhitespace: prod
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: ['main', 'vendor', 'runtime'],
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
    }
}