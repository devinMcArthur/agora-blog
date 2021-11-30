module.exports = {
  webpackDevMiddleware: (config) => {
    config.watchOptions = {
      poll: 800,
      aggregateTimeout: 300,
    };
    return config;
  },
  serverRuntimeConfig: {
    SSR_API_URL: process.env.SSR_API_URL,
  },
};
