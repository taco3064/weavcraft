const fs = require('fs');
const path = require('path');

const languages = fs
  .readdirSync(path.resolve(__dirname, './public/locales'))
  .filter((fileName) => !/^index\.(t|j)s$/.test(fileName));

/**
 * @type {import('next-i18next').UserConfig}
 */
const config = {
  i18n: {
    defaultLocale: languages[0],
    locales: languages,
  },
  reloadOnPrerender: true,
};

module.exports = config;
