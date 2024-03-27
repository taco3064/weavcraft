/* eslint-disable */
export default {
  coverageDirectory: '../../coverage/apps/web',
  displayName: 'web',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  preset: '../../jest.preset.js',
  globals: {
    __WEBPACK_DEFINE__: {
      ENV: 'development',
      LANGUAGES: ['en', 'zh'],
      VERSION: '0.0.1',
    },
  },
  moduleNameMapper: {
    '@alienfast/i18next-loader\\?relativePathAsNamespace=true!\\~web/locales':
      '<rootDir>/src/locales/index.ts',
    '^~web/assets/(.*)': '<rootDir>/src/assets/$1',
  },
  transform: {
    '^(?!.*\\.(js|jsx|ts|tsx|css|json)$)': '@nx/react/plugins/jest',
    '^.+\\.[tj]sx?$': ['babel-jest', { presets: ['@nx/next/babel'] }],
  },
};
