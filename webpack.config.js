const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')

let mode = "development"
let target = 'web'
const plugins = [
  new CleanWebpackPlugin(),
  new MiniCssExtractPlugin(),
  new HtmlWebpackPlugin({
    template: "./src/index.html"
  }),
]

if(process.env.NODE_ENV === 'production') {
  mode = 'production'
  target = 'browserslist'
}

if(process.env.SERVE) {
  plugins.push(  new ReactRefreshPlugin())
}

module.exports = {
  mode,
  target,

  entry: './src/index.js',

  output: {
    path: path.resolve(__dirname, 'dist'),
    assetModuleFilename: "images/[hash][ext][query]"
  },

  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: 'assets ',
        parser: {
          dataUrlCondition: {
            maxSize: 30 * 1024
          }
        }
      },
      {
        test: /\.s?css$/i,
        use: [
          {
            loader:  MiniCssExtractPlugin.loader,
            options: {publicPath: ""},
          },
          'css-loader',
          'postcss-loader',
          'sass-loader']
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: ['babel-loader',  'eslint-loader']
      }
    ]
  },

  plugins,

  resolve: {
    extensions: ['.js', '.jsx']
  },

  devtool: "source-map",
  devServer: {
    contentBase: './dist',
    hot: true
  }
}
