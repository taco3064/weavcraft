import { useTranslation } from 'next-i18next';

import { getServerSideProps } from './_app.page';
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

export { getServerSideProps };
