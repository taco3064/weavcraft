const { DefinePlugin } = require('webpack');
const { composePlugins, withNx } = require('@nx/next');

//* 取得 App 支援的 Languages
const { i18n } = require('./next-i18next.config');
const { version } = require('../../package.json');

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 */
const nextConfig = {
  i18n,
  pageExtensions: ['page.tsx'],
  transpilePackages: ['@mui/x-charts'],
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
      destination: '/:path*', // Proxy to Backend
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
        'process.env.NEXT_PUBLIC_VERSION': JSON.stringify(version),
        'process.env.NEXT_PUBLIC_DEFAULT_LANGUAGE': JSON.stringify(
          i18n.defaultLocale
        ),
      }),
    ],
  }),
};

module.exports = composePlugins(
  // Add more Next.js plugins to this list if needed.
  withNx
)(nextConfig);
