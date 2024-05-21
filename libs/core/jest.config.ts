/* eslint-disable */
export default {
  coverageDirectory: '../../coverage/libs/core',
  coverageReporters: ['html', 'text', 'lcov'],
  displayName: 'core',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  preset: '../../jest.preset.js',
  transform: {
    '^.+\\.[tj]sx?$': [
      '@swc/jest',
      {
        jsc: {
          parser: { syntax: 'typescript', tsx: true },
          transform: { react: { runtime: 'automatic' } },
        },
      },
    ],
  },
};
