const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

const TEMPLATE_PATH = path.join(__dirname, './index.html');
const SRC_PATH = path.join(__dirname, './src');
const STATIC_PATH = path.join(__dirname, './dist');

let webpackConfig = {
    mode: 'development',
    entry: { index: path.join(SRC_PATH, '/index.js') },
    output: {
        path: STATIC_PATH,
        filename: '[name].[hash].js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'ViteJS Demo',
            template: TEMPLATE_PATH
        }),
        new VueLoaderPlugin()
    ],
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendor',
                    chunks: 'all'
                },
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true
                }
            }
        }
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: [{ loader: 'vue-loader' }]
            },
            {
                test: /\.(svg|png|jpg|gif)$/,
                loader: 'url-loader',
                query: {
                    // 10KB
                    limit: 10 * 1024
                }
            }, {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }, {
                test: /(\.scss$|\.css$|\.sass$)/,
                use: [
                    { loader: 'style-loader' },
                    { loader: 'css-loader' },
                    { loader: 'sass-loader' }
                ]
            } ]
    },
    resolve: {
        alias: {
            vue: 'vue/dist/vue.js',
            src: SRC_PATH
        },
        extensions: [ '.js', '.scss', '.vue', '.json' ]
    },
    devServer: {
        quiet: false,
        port: 8080,
    }
};

module.exports = webpackConfig;
