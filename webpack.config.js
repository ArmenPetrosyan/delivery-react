var webpack = require('webpack');
const path = require('path');
const baseDir = process.cwd();

module.exports = {
  entry: './src/index.js',
  output: {
    path: './public',
    filename: 'build.js'
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
  ],
  resolve: {
    root: [
      path.resolve(baseDir, 'src/app'),
      path.resolve(baseDir, 'src/app/layout'),
      path.resolve(baseDir, 'src/app/components'),
      path.resolve(baseDir, 'src/app/styles'),
    ],
    extensions: ['', '.js', '.es6', '.jsx']
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ['babel'],
        exclude: 'node_modules'
      },
      {
        test   : /\.less$/,
        loader : 'style-loader!css-loader!less-loader!postcss-loader'
      },
      {
        test   : /\.css$/,
        loader : 'style-loader!css-loader!postcss-loader'
      },
      {
        test    : /\.jsx?$/,
        loader  : 'babel',
        exclude : /node_modules/,
        query   : {
          presets: ['es2015', 'react', 'stage-0']
        }
      }
    ]
  },
  postcss: function() {
    return [
      require('autoprefixer')
    ]
  }
};