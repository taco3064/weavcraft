const fs = require('fs');
const path = require('path');
const { DefinePlugin } = require('webpack');
const { composePlugins, withNx } = require('@nx/next');

const { version } = require('../../package.json');

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  pageExtensions: ['page.tsx'],
  nx: {
    // Set this to true if you would like to to use SVGR
    // See: https://github.com/gregberge/svgr
    svgr: false,
  },
  compiler: {
    // For other options, see https://nextjs.org/docs/architecture/nextjs-compiler#emotion
    emotion: true,
  },
  webpack: ({ module, plugins, ...config }, context) => {
    //* 取得 App 支援的 Languages
    const languages = fs
      .readdirSync(path.resolve(__dirname, './src/locales'))
      .filter((fileName) => !/^index\.(t|j)s$/.test(fileName));

    return {
      ...config,
      module: {
        ...module,
        rules: [
          ...module.rules,
          {
            test: /\.svg$/,
            use: ['@svgr/webpack'],
          },
        ],
      },
      plugins: [
        ...plugins,
        new DefinePlugin({
          '__WEBPACK_DEFINE__.ENV': JSON.stringify(context.buildId),
          '__WEBPACK_DEFINE__.LANGUAGES': JSON.stringify(languages),
          '__WEBPACK_DEFINE__.VERSION': JSON.stringify(version),
        }),
      ],
    };
  },
};

module.exports = composePlugins(
  // Add more Next.js plugins to this list if needed.
  withNx
)(nextConfig);
