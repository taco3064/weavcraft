const fs = require('fs');
const path = require('path');
const { DefinePlugin } = require('webpack');
const { composePlugins, withNx } = require('@nx/next');

//* 取得 App 支援的 Languages
const languages = fs.readdirSync(path.resolve(__dirname, './public/locales'));
const { version } = require('../../package.json');

const i18n = {
  defaultLocale: languages[0],
  locales: languages,
};

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  i18n,
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
  webpack: ({ module, plugins, ...config }, context) => ({
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
        '__WEBPACK_DEFINE__.I18N': JSON.stringify(i18n),
        '__WEBPACK_DEFINE__.VERSION': JSON.stringify(version),
      }),
    ],
  }),
};

module.exports = composePlugins(
  // Add more Next.js plugins to this list if needed.
  withNx
)(nextConfig);
