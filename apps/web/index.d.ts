/* eslint-disable @typescript-eslint/no-explicit-any */

declare module '@alienfast/i18next-loader?relativePathAsNamespace=true!*' {
  const contents: import('i18next').Resource;

  export default contents;
}

declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_API_URL: string;
    NEXT_PUBLIC_AUTH_SECRET: string;
    NEXT_PUBLIC_BASE_URL: string;
    NEXT_PUBLIC_DEFAULT_LANGUAGE: string;
    NEXT_PUBLIC_DEFAULT_ROW_HEIGHT: number;
    NEXT_PUBLIC_TRANSITION_DURATION: number;
    NEXT_PUBLIC_TUTORIAL_TOKEN: string;
    NEXT_PUBLIC_VERSION: string;
    NEXT_PUBLIC_XS_WIDTH: number;

    NEXT_PUBLIC_DEFAULT_COLS: Record<
      import('@mui/material/styles').Breakpoint,
      number
    >;
  }
}
