const { DefinePlugin } = require('webpack');
const { composePlugins, withNx } = require('@nx/next');
const sha256 = require('crypto-js/sha256');

//* 取得 App 支援的 Languages
const { i18n } = require('./next-i18next.config');
const { version } = require('../../package.json');
const API_URL = 'https://api.weavcraft.com';
const TUTORIAL_TOKEN = sha256(`tutorial-${version}`).toString();

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 */
const nextConfig = {
  i18n,
  pageExtensions: ['page.tsx', 'service.ts'],
  transpilePackages: ['@mui/x-charts', '@mui/material/styles'],
  nx: {
    svgr: true,
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
      source: '/service/:path*',
      destination: `${API_URL}/:path*`,
    },
  ],
  webpack: ({ plugins, ...config }) => ({
    ...config,
    plugins: [
      ...plugins,
      new DefinePlugin({
        'process.env.NEXT_PUBLIC_API_URL': JSON.stringify(API_URL),
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
