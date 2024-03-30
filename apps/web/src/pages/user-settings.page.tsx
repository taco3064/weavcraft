import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import type { GetServerSideProps } from 'next';

import { I18N_USER_CONFIG } from '~web/contexts';
import { MainLayout, UserSettings } from '~web/containers';
import { makePerPageLayout } from './_app.page';

export default makePerPageLayout(MainLayout)(UserSettings);

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(
      locale || 'en',
      ['common'],
      I18N_USER_CONFIG
    )),
  },
});
