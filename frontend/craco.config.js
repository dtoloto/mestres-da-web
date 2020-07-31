const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          modifyVars: {
            '@primary-color': '#495AFF',
            '@success-color': '#00ECBC',
            '@error-color': '#FF5864',
            '@highlight-color': '#FF5864',
          },
          javascriptEnabled: true,
        },
      },
    },
  ],
};