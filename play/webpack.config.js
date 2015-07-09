var webpack = require('webpack');

var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');

// definePlugin takes raw strings and inserts them, so you can put strings of JS if you want.
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
      { test: /\.css$/, loader: 'style!css' },
      //{ test: /\/src\/routes\/.*/, loader: 'react-router-proxy' },
      { test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel' },
      //{ test: /\.js?$/, loaders: ['react-hot', 'babel'], exclude: /node_modules/ },
      { test: /\.json$/, loader: 'json-loader'}
    ]
  },
  devtool: 'source-map',
  stats: {
    colors: true
  },
  watch: true,
  keepalive: true,
  plugins: [commonsPlugin]
};
