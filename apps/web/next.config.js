const { DefinePlugin } = require('webpack');
const { composePlugins, withNx } = require('@nx/next');
const crypto = require('crypto');
const sha256 = require('crypto-js/sha256');
const API_URL = 'https://api.weavcraft.com';

//* 取得 App 支援的 Languages
const { i18n } = require('./next-i18next.config');
const { siteUrl } = require('./next-sitemap.config');
const { version } = require('../../package.json');

const {
  AUTH_SECRET = crypto.randomBytes(32).toString('base64'),
  TUTORIAL_TOKEN = sha256(`tutorial-${version}`).toString(),
} = process.env;

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 */
const nextConfig = {
  i18n,
  pageExtensions: ['page.tsx', 'service.ts'],
  transpilePackages: ['@mui/x-charts', '@mui/material/styles'],
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
        'process.env.NEXT_PUBLIC_AUTH_SECRET': JSON.stringify(AUTH_SECRET),
        'process.env.NEXT_PUBLIC_BASE_URL': JSON.stringify(siteUrl),
        'process.env.NEXT_PUBLIC_DEFAULT_ROW_HEIGHT': JSON.stringify(48),
        'process.env.NEXT_PUBLIC_TRANSITION_DURATION': JSON.stringify(400),
        'process.env.NEXT_PUBLIC_VERSION': JSON.stringify(version),
        'process.env.NEXT_PUBLIC_XS_WIDTH': JSON.stringify(444),

        'process.env.NEXT_PUBLIC_DEFAULT_LANGUAGE': JSON.stringify(
          i18n.defaultLocale
        ),
        'process.env.NEXT_PUBLIC_TUTORIAL_TOKEN':
          JSON.stringify(TUTORIAL_TOKEN),

        'process.env.NEXT_PUBLIC_DEFAULT_COLS': JSON.stringify({
          xs: 2,
          sm: 3,
          md: 4,
          lg: 6,
          xl: 8,
        }),
      }),
    ],
  }),
};

module.exports = composePlugins(
  // Add more Next.js plugins to this list if needed.
  withNx
)(nextConfig);
