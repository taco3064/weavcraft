const { DefinePlugin } = require('webpack');
const { composePlugins, withNx } = require('@nx/next');
const sha256 = require('crypto-js/sha256');

//* 取得 App 支援的 Languages
const { i18n } = require('./next-i18next.config');
const { version } = require('../../package.json');
const TUTORIAL_TOKEN = sha256(`tutorial-${version}`).toString();

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 */
const nextConfig = {
  i18n,
  pageExtensions: ['page.tsx'],
  transpilePackages: ['@mui/x-charts', '@mui/material/styles'],
  nx: {
    // Set this to true if you would like to to use SVGR
    // See: https://github.com/gregberge/svgr
    svgr: false,
  },
  compiler: {
    // For other options, see https://nextjs.org/docs/architecture/nextjs-compiler#emotion
    emotion: true,
  },
  rewrites: async () => [
    {
      source: '/tutorial/:path*',
      destination: `/:path*?tutorial=${TUTORIAL_TOKEN}`,
    },
    {
      source: '/api/parser/:path*',
      destination: '/api/parser/:path*',
    },
    {
      source: '/api/:path*',
      destination: 'http://127.0.0.1:4000/:path*',
    },
  ],
  webpack: ({ module, plugins, ...config }) => ({
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
        'process.env.NEXT_PUBLIC_TRANSITION_DURATION': JSON.stringify(400),
        'process.env.NEXT_PUBLIC_VERSION': JSON.stringify(version),
        'process.env.NEXT_PUBLIC_DEFAULT_LANGUAGE': JSON.stringify(
          i18n.defaultLocale
        ),
        'process.env.NEXT_PUBLIC_TUTORIAL_TOKEN':
          JSON.stringify(TUTORIAL_TOKEN),
      }),
    ],
  }),
};

module.exports = composePlugins(
  // Add more Next.js plugins to this list if needed.
  withNx
)(nextConfig);
