import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import type { GetServerSideProps } from 'next';

import { Breadcrumbs, MainLayout, UserSettings } from '~web/containers';
import { PageContainer } from '~web/components';
import { getTranslations } from '../common.server.side';
import { makePerPageLayout } from '../common.client.side';
import type { UserSettingType } from '../imports.types';

export default makePerPageLayout(MainLayout)(function UserSettingsPage() {
  const { t } = useTranslation();
  const { query } = useRouter();

  return (
    <PageContainer maxWidth="sm">
      <NextSeo
        title={`${t('ttl-user-settings')} | ${t('ttl-weavcraft')}`}
        canonical={`${process.env.NEXT_PUBLIC_BASE_URL}/user-settings/settings`}
        openGraph={{
          title: t('ttl-weavcraft'),
          description: t('msg-short-intro'),
          images: [
            {
              url: `${process.env.NEXT_PUBLIC_BASE_URL}/imgs/logo.png`,
              width: 256,
              height: 256,
              alt: 'Logo',
              type: 'image/png',
            },
          ],
        }}
      />

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
    ...(await getTranslations(ctx)),
  },
});
