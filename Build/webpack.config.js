const path = require('path');

const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const RemoveEmptyScriptsPlugin = require('webpack-remove-empty-scripts');

const PRIVATE_PATH = path.resolve(__dirname, '../Resources/Private');
const PUBLIC_PATH = path.resolve(__dirname, '../Resources/Public');

module.exports = (env, argv) => {
  const useBabel = argv.mode === 'production';

  return {
    devtool: "source-map",
    entry: {
      'SxndScripts': `${PRIVATE_PATH}/JavaScript/SxndScripts.js`,

      // We only list the entry JS here; the Less and CSS are imported there.
      'SxndPlayerApp': `${PRIVATE_PATH}/JavaScript/SlubMediaPlayer`,

      'SxndStyles': `${PRIVATE_PATH}/Less/All.less`,
      'RteStyles': `${PRIVATE_PATH}/Less/Rte.less`,
      'SxndKitodoViewer': `${PRIVATE_PATH}/Less/KitodoViewer.less`,
      'SxndMediaPlayer': `${PRIVATE_PATH}/Less/SxndMediaPlayer.less`,
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
        useBabel ? (
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
              loader: "babel-loader",
            },
          }
        ) : {},
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
      splitChunks: {
        chunks(chunk) {
          return chunk.name === 'SxndPlayerApp';
        },
        maxInitialRequests: Infinity,
        minSize: 0,
        cacheGroups: {
          playerVendor: {
            test: /[\\/]node_modules[\\/]/,
            name: "SxndPlayerVendor",
          },
        },
      },
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
};
