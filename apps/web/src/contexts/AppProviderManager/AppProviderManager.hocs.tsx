import type { MakePerPageLayout } from './AppProviderManager.types';

export const makePerPageLayout: MakePerPageLayout = (Layout) => (Page) => {
  Page.getLayout = (page) => <Layout>{page}</Layout>;

  return Page;
};
