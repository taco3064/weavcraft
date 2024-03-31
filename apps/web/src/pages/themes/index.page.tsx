import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import type { GetServerSideProps } from 'next';

import ThemeGroupPage from './[group].page';
import { I18N_USER_CONFIG } from '~web/contexts';

export default ThemeGroupPage;

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(
      locale || I18N_USER_CONFIG.i18n.defaultLocale,
      ['common', 'themes'],
      I18N_USER_CONFIG
    )),
  },
});
