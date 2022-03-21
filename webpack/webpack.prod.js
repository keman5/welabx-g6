/*!
 * @author claude
 * date 07/05/2019
 * webpack 生产配置
 */

const webpack = require('webpack');
const { merge } = require('webpack-merge');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const webpackConfig = require('./webpack.common');

module.exports = merge(webpackConfig, {
  mode:    'production',
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ['**/*', '!**/lib/**', '!**/library/**'],
    }),
    new webpack.HashedModuleIdsPlugin(), // 强制缓存
  ],
  optimization: {
    minimizer: [
      new OptimizeCSSAssetsPlugin(),
      new TerserJSPlugin({
        terserOptions: {
          warnings: false,
          output:   {
            comments: false,
          },
          compress: {
            drop_console:  true,
            drop_debugger: true,
          },
        },
        sourceMap: false,
        parallel:  true,
      }),
    ],
  },
});
