const path = require('path');

const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const RemoveEmptyScriptsPlugin = require('webpack-remove-empty-scripts');

const PRIVATE_PATH = path.resolve(__dirname, '../Resources/Private');
const PUBLIC_PATH = path.resolve(__dirname, '../Resources/Public');

module.exports = {
  devtool: "source-map",
  entry: {
    'sxndScripts': `${PRIVATE_PATH}/JavaScript/sxndScripts.js`,

    // We only list the entry JS here; the Less and CSS are imported there.
    'sxndShakaPlayer': `${PRIVATE_PATH}/JavaScript/VideoPlayer/SachsenShakaPlayer.js`,

    'sxndStyles' : `${PRIVATE_PATH}/Less/All.less`,
    'rteStyles': `${PRIVATE_PATH}/Less/Rte.less`,
    'sxndKitodoViewer': `${PRIVATE_PATH}/Less/KitodoViewer.less`,
  },
  output: {
    filename: 'JavaScript/[name].js',
    path: PUBLIC_PATH,
  },
  plugins: [
    new RemoveEmptyScriptsPlugin(),
    new MiniCssExtractPlugin({
      filename: "Css/[name].css",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css|\.less$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: "css-loader",
            options: {
              // Don't attempt to resolve URLs in CSS
              url: false,
              sourceMap: true,
            },
          },
          {
            loader: "less-loader",
            options: {
              lessOptions: {
                // Don't adjust relative URLs in Less
                relativeUrls: false,
              },
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
