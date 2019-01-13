const path = require('path');
const ForkTSCheckerPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = (config, options) => {
  config.resolve.extensions.push('.ts', '.js', '.vue', '.css', '.html');

  config.module.rules.push({
    test: /\.tsx?$/,
    loader: 'ts-loader',
    options: {
      appendTsSuffixTo: [/\.vue$/],
      transpileOnly: true
    }
  });

  // Add alias
  config.resolve.alias['~'] = path.resolve(__dirname, './src');

  // Do not run type checking twice. (This config is called twice,
  // one time for the server bundle, and one time for the client bundle.)
  if (options.isServer) {
    config.plugins.push(new ForkTSCheckerPlugin({
      vue: true
    }));
  }

  return config;
};
