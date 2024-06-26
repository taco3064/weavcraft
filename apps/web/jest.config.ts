/* eslint-disable */
export default {
  coverageDirectory: '../../coverage/apps/web',
  coverageReporters: ['html', 'text', 'lcov'],
  displayName: 'web',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  preset: '../../jest.preset.js',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  transformIgnorePatterns: ['/node_modules/(?!lowdb)'],
  moduleNameMapper: {
    '^~web/assets/(.*)': '<rootDir>/src/assets/$1',
  },
  transform: {
    '^(?!.*\\.(js|jsx|ts|tsx|css|json)$)': '@nx/react/plugins/jest',
    '^.+\\.[tj]sx?$': ['babel-jest', { presets: ['@nx/next/babel'] }],
  },
};
