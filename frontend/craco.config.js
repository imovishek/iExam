const CracoLessPlugin = require('craco-less');
const globalConfig = require('./src/utitlities/global.config');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { 
              '@primary-color': globalConfig.primaryColor,
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};