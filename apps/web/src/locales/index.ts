import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import resources from '@alienfast/i18next-loader?relativePathAsNamespace=true!./';

i18n.use(initReactI18next).init({
  keySeparator: '.',
  resources,
  lng: global.localStorage?.getItem('lng') || __WEBPACK_DEFINE__.LANGUAGES[0],
  fallbackLng: {
    default: __WEBPACK_DEFINE__.LANGUAGES,
  },
  interpolation: {
    escapeValue: false,
    formatSeparator: ',',
  },
});
