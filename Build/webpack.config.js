const path = require('path');

const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

const PRIVATE_PATH = path.resolve(__dirname, '../Resources/Private');
const PUBLIC_PATH = path.resolve(__dirname, '../Resources/Public');

module.exports = {
  devtool: "source-map",
  entry: {
    'JavaScript/sxndScripts': `${PRIVATE_PATH}/JavaScript/sxndScripts.js`,
    'JavaScript/sxndShakaPlayer': `${PRIVATE_PATH}/JavaScript/VideoPlayer/SachsenShakaPlayer.js`,
  },
  output: {
    filename: '[name].js',
    path: PUBLIC_PATH,
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
            options: {
              url: false,
              sourceMap: true,
            },
          },
        ],
      },
    ],
  },
  externals: {
    jquery: 'jQuery',
  },
  optimization: {
    minimizer: [
      `...`,
      new CssMinimizerPlugin(),
    ],
  },
  resolve: {
    modules: [
      path.resolve(__dirname, 'node_modules'),
    ]
  },
};
