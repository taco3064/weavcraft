import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import type { GetServerSideProps } from 'next';

import { I18N_USER_CONFIG, makePerPageLayout } from '~web/contexts';
import { MainLayout } from '~web/containers';

export default makePerPageLayout(MainLayout)(function IndexPage() {
  return <>Index</>;
});

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(
      locale || I18N_USER_CONFIG.i18n.defaultLocale,
      ['common'],
      I18N_USER_CONFIG
    )),
  },
});
