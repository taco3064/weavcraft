const { i18n } = require('./next-i18next.config');

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://www.weavcraft.com',
  autoLastmod: true,
  generateRobotsTxt: true,
  sourceDir: 'apps/web/.next',
  outDir: 'apps/web/public',
  additionalPaths: async (config) => [
    config.transform(config, '/user-settings/settings'),
    ...['themes', 'widgets', 'pages'].map((path) =>
      config.transform(config, `/tutorial/${path}`)
    ),
  ],
  transform: (config, path) => {
    const paths = path.substring(1).split('/');
    const level = paths.length;

    const adjust = {
      '': -1,
      tutorial: 1,
      'user-settings': 2,
    };

    return {
      changefreq: config.changefreq,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
      loc: path,
      priority: Math.max(
        0,
        Math.min(1, 1 - (level + (adjust[paths[0]] || 0)) * 0.1)
      ),
      images: [
        {
          loc: new URL('/imgs/logo.png', config.siteUrl),
          caption: 'Logo',
          title: 'Weavcraft',
        },
      ],
      alternateRefs: i18n.locales.map((locale) => ({
        href: new URL(
          [locale === 'en' ? '' : `/${locale}`, path].join(''),
          config.siteUrl
        ).href,
        hreflang: locale,
        hrefIsAbsolute: true,
      })),
    };
  },
};
