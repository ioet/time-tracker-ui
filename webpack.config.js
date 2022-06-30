const webpack = require('webpack')
const { addTailwindPlugin } = require("@ngneat/tailwind");
const tailwindConfig = require("./tailwind.config.js");

module.exports = (config) => {
  const config_ = {
    ...config,
    plugins : [
      ...config.plugins,
      new webpack.DefinePlugin({
        'process.env.API_URL': JSON.stringify(process.env["API_URL"]),
        'process.env.AUTHORITY': JSON.stringify(process.env["AUTHORITY"]),
        'process.env.API_URL':JSON.stringify(process.env["API_URL"]),
        'process.env.CLIENT_ID':JSON.stringify(process.env["CLIENT_ID"]),
        'process.env.CLIENT_URL':JSON.stringify(process.env["CLIENT_URL"]),
        'process.env.SCOPES':JSON.stringify(process.env["SCOPES"]),
        'process.env.STACK_EXCHANGE_ID':JSON.stringify(process.env["STACK_EXCHANGE_ID"]),
        'process.env.STACK_EXCHANGE_ACCESS_TOKEN':JSON.stringify(process.env["STACK_EXCHANGE_ACCESS_TOKEN"]),
        'process.env.AZURE_APP_CONFIGURATION_CONNECTION_STRING':JSON.stringify(process.env["AZURE_APP_CONFIGURATION_CONNECTION_STRING"])
    })
  ]
  }
  addTailwindPlugin({
    webpackConfig: config_,
    tailwindConfig,
    patchComponentsStyles: true
  });
  return config_;
};
