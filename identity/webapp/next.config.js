const webpack = require('webpack');
const path = require('path');
const withTM = require('next-transpile-modules')(['@weco/common', '@weco/catalogue']);
const withBundleAnalyzer = require('@next/bundle-analyzer');
const buildHash = process.env.BUILD_HASH || 'test';
const isProd = process.env.NODE_ENV === 'production';

const config = function (webpack) {
  const prodSubdomain = process.env.PROD_SUBDOMAIN || '';
  const withBundleAnalyzerConfig = withBundleAnalyzer({
    analyzeServer: ['server', 'both'].includes(process.env.BUNDLE_ANALYZE),
    analyzeBrowser: ['browser', 'both'].includes(process.env.BUNDLE_ANALYZE),
    bundleAnalyzerConfig: {
      server: {
        analyzerMode: 'static',
        generateStatsFile: true,
        statsFilename: `../../.dist/server.${buildHash}.json`,
        reportFilename: `../../.dist/server.${buildHash}.html`,
        openAnalyzer: false,
      },
      browser: {
        analyzerMode: 'static',
        generateStatsFile: true,
        statsFilename: `../.dist/browser.${buildHash}.json`,
        reportFilename: `../.dist/browser.${buildHash}.html`,
        openAnalyzer: false,
      },
    },
  });

  const apmConfig = {
    environment: process.env.APM_ENVIRONMENT,
    serverUrl: process.env.APM_SERVER_URL,
    centralConfig: true,
  };

  const rewrites =
    process.env.NODE_ENV === 'development'
      ? [
          {
            source: '/api/users/me',
            destination: 'http://localhost:3000/api/users/me',
          },
          {
            source: '/api/users/:user_id/item-requests',
            destination:
              'http://localhost:3000/api/users/:user_id/item-requests',
          },
        ]
      : [];

  return withTM({
      assetPrefix:
        isProd && prodSubdomain
          ? `https://${prodSubdomain}.wellcomecollection.org`
          : '',
      publicRuntimeConfig: {
        apmConfig,
      },
      ...withBundleAnalyzerConfig,
      async rewrites() {
        return rewrites;
      },
    })
};

module.exports = config(webpack);
