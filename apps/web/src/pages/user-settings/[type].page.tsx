import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import type { GetServerSideProps } from 'next';

import { Breadcrumbs, MainLayout, UserSettings } from '~web/containers';
import { PageContainer } from '~web/components';
import { getServerSideTranslations } from '../common.server.side';
import { makePerPageLayout } from '~web/contexts';
import type { UserSettingType } from '../imports.types';

export default makePerPageLayout(MainLayout)(function UserSettingsPage() {
  const { t } = useTranslation();
  const { query } = useRouter();

  return (
    <PageContainer maxWidth="sm">
      <Breadcrumbs
        disableGutters
        currentPageTitle={t('ttl-user-settings')}
        customBreadcrumbs={{ '/user-settings': 'nonLinkable' }}
        onCatchAllRoutesTransform={(key, value) => {
          if (key === 'type' && typeof value === 'string') {
            return [
              {
                href: `/user-settings/${value}`,
                label: t(`lbl-${value}`),
              },
            ];
          }
        }}
      />
      <UserSettings type={query.type as UserSettingType} />
    </PageContainer>
  );
});

export const getServerSideProps: GetServerSideProps = async (ctx) => ({
  props: {
    ...(await getServerSideTranslations(ctx)),
  },
});
