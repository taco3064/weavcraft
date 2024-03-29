import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import type { GetServerSideProps } from 'next';

import { MainLayout, UserSettings } from '~web/containers';
import { makePerPageLayout } from './_app.page';

export default makePerPageLayout(MainLayout)(UserSettings);

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale || 'en', ['common'], {
      i18n: __WEBPACK_DEFINE__.I18N,
    })),
  },
});
