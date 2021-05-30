const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')

const path = require('path')
let mode = 'development'
let target = 'web'
const plugins = [
  new CleanWebpackPlugin(),
  new MiniCssExtractPlugin(),
  new HtmlWebpackPlugin({
    template: './src/index.html',
  }),
]

if (process.env.NODE_ENV === 'production') {
  mode = 'production'
  target = 'browserslist'
}

if (process.env.SERVE) {
  plugins.push(new ReactRefreshPlugin())
}

module.exports = {
  mode,
  target,

  entry: './src/index.js',

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename:
      mode === 'production' ? 'bundle.js' : 'bundle[fullhash].js',
    assetModuleFilename: 'images/[hash][ext][query]',
  },

  module: {
    rules: [
      {
        test: /\.svg$/,
        // type: 'asset/inline',
        // parser: {
        //   dataUrlCondition: {
        //     maxSize: 30 * 1024,
        //   },
        // },
        use: '@svgr/webpack',
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 30 * 1024,
          },
        },
      },
      {
        test: /\.s?css$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: { publicPath: '' },
          },
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'eslint-loader'],
      },
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        extractComments: false,
      }),
    ],
  },

  plugins,

  resolve: {
    extensions: ['.js', '.jsx'],
  },

  devtool: mode === 'production' ? false : 'source-map',
  devServer: {
    contentBase: './dist',
    hot: true,
  },
}
