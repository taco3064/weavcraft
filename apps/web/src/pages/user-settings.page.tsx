import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import type { GetServerSideProps } from 'next';

import { I18N_USER_CONFIG } from '~web/contexts';
import { Breadcrumbs, MainLayout, UserSettings } from '~web/containers';
import { makePerPageLayout } from './_app.page';

export default makePerPageLayout(MainLayout)(function UserSettingsPage() {
  const { t } = useTranslation();

  return (
    <>
      <Breadcrumbs currentPageTitle={t('ttl-user-settings')} />
      <UserSettings />
    </>
  );
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
