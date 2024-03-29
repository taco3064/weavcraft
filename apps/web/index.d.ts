/* eslint-disable @typescript-eslint/no-explicit-any */
declare module '*.svg' {
  const content: any;
  export const ReactComponent: any;
  export default content;
}

declare module '@alienfast/i18next-loader?relativePathAsNamespace=true!*' {
  const contents: import('i18next').Resource;

  export default contents;
}

declare const __WEBPACK_DEFINE__: {
  ENV: 'development' | 'production';
  LANGUAGES: string[];
  VERSION: string;
};
