import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import type { GetServerSideProps } from 'next';

import { I18N_USER_CONFIG } from '~web/contexts';
import { MainLayout } from '~web/containers';
import { makePerPageLayout } from './_app.page';

export default makePerPageLayout(MainLayout)(function IndexPage() {
  return <>Index</>;
});

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(
      locale || 'en',
      ['common'],
      I18N_USER_CONFIG
    )),
  },
});
