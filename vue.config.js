const webpack = require('webpack');
const configureAPI = require('./server/index');

module.exports = {
  devServer: {
    before: configureAPI,
  },
  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
        // other modules
        introJs: ['intro.js'],
      })
    ]
  }
};
