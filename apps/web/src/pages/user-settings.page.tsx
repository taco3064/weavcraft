import { useTranslation } from 'next-i18next';
import type { GetServerSideProps } from 'next';

import { getServerSideTranslations } from './pages.utils';
import { makePerPageLayout } from '~web/contexts';
import { Breadcrumbs, MainLayout, UserSettings } from '~web/containers';

export default makePerPageLayout(MainLayout)(function UserSettingsPage() {
  const { t } = useTranslation();

  return (
    <>
      <Breadcrumbs currentPageTitle={t('ttl-user-settings')} />
      <UserSettings />
    </>
  );
});

export const getServerSideProps: GetServerSideProps = async (ctx) => ({
  props: {
    ...(await getServerSideTranslations(ctx)),
  },
});
