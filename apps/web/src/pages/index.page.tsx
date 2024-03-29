import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import type { GetServerSideProps } from 'next';

import { MainLayout } from '~web/containers';
import { makePerPageLayout } from './_app.page';

export default makePerPageLayout(MainLayout)(function IndexPage() {
  return <>Index</>;
});

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale || 'en', ['common'], {
      i18n: __WEBPACK_DEFINE__.I18N,
    })),
  },
});
