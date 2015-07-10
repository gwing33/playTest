var webpack = require('webpack');

var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');

/* * *
 * definePlugin takes raw strings and inserts them, so you can put strings of JS if you want.
 * - - - Usage in code - - -
 * if (__DEV__) {
 *   console.warn('Extra logging');
 * }
 * if (__PRERELEASE__) {
 *   showSecretFeature();
 * }
 * * */
var definePlugin = new webpack.DefinePlugin({
  __DEV__: JSON.stringify(JSON.parse(process.env.BUILD_DEV || 'true')),
  __PRERELEASE__: JSON.stringify(JSON.parse(process.env.BUILD_PRERELEASE || 'false'))
});

module.exports = {
  resolve: {
    extensions: ['', '.js']
  },
  entry: {
    app: './src/app.js'
  },
  output: {
    path: './public/build',
    publicPath: '/assets/build/',
    filename: '[name].js'
  },
  module: {
    loaders: [
      { test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel' },
      { test: /\.json$/, loader: 'json-loader'}
    ]
  },
  devtool: 'source-map',
  stats: {
    colors: true
  },
  plugins: [commonsPlugin, definePlugin]
};
