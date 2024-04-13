import type { GetServerSideProps } from 'next';

import { getServerSideTranslations } from './pages.utils';
import { makePerPageLayout } from '~web/contexts';
import { MainLayout } from '~web/containers';

export default makePerPageLayout(MainLayout)(function IndexPage() {
  return <>Index</>;
});

export const getServerSideProps: GetServerSideProps = async (ctx) => ({
  props: {
    ...(await getServerSideTranslations(ctx)),
  },
});
