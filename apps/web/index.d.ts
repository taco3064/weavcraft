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

declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_API_URL: string;
    NEXT_PUBLIC_DEFAULT_LANGUAGE: string;
    NEXT_PUBLIC_TRANSITION_DURATION: number;
    NEXT_PUBLIC_TUTORIAL_TOKEN: string;
    NEXT_PUBLIC_VERSION: string;
  }
}
