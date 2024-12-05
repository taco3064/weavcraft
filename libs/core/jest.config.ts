/* eslint-disable */
export default {
  collectCoverage: true,
  coverageReporters: ['text'],
  coveragePathIgnorePatterns: ['./src/styles', 'index.ts'],
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
