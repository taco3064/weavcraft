/* eslint-disable no-restricted-imports */
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { useRouter } from 'next/router';
import 'intersection-observer';

import commonEn from './public/locales/en/common.json';
import commonZh from './public/locales/zh/common.json';
import introEn from './public/locales/en/intro.json';
import introZh from './public/locales/zh/intro.json';
import themesEn from './public/locales/en/themes.json';
import themesZh from './public/locales/zh/themes.json';
import tutorialEn from './public/locales/en/tutorial.json';
import tutorialZh from './public/locales/zh/tutorial.json';

i18n.use(initReactI18next).init({
  defaultNS: 'common',
  lng: 'en',
  resources: {
    en: {
      common: commonEn,
      intro: introEn,
      themes: themesEn,
      tutorial: tutorialEn,
    },
    zh: {
      common: commonZh,
      intro: introZh,
      themes: themesZh,
      tutorial: tutorialZh,
    },
  },
});

jest.mock('@mui/x-charts', () => ({
  PieChart: jest.fn().mockImplementation(({ children }) => children),
}));

jest.mock('@mui/material/styles/createPalette', () => ({
  default: jest.fn().mockImplementation(({ children }) => children),
}));

jest.mock('react-json-tree', () => ({
  JSONTree: jest.fn().mockImplementation(({ children }) => children),
}));

jest.mock('next/router', () => ({
  useRouter: jest.fn().mockReturnValue({ locale: 'en' }),
}));
