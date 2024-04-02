import { i18n, useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import { useState } from 'react';
import type { GetServerSideProps } from 'next';

import { Breadcrumbs, HierarchyList, MainLayout } from '~web/containers';
import { makePerPageLayout } from '~web/contexts';
import type { PortalContainerEl } from '~web/components';

export default makePerPageLayout(MainLayout)(function ThemeGroupsPage() {
  const [toolbarEl, setToolbarEl] = useState<PortalContainerEl>(null);

  const { t } = useTranslation();
  const { query } = useRouter();
  const group = typeof query.group === 'string' ? query.group : undefined;

  return (
    <>
      <Breadcrumbs
        currentBreadcrumbLabel={group}
        currentPageTitle={!group ? t('ttl-breadcrumbs.themes.label') : group}
        onToolbarMount={setToolbarEl}
        onCatchAllRoutesTransform={(key, value) => {
          if (key === 'group' && typeof value === 'string') {
            // TODO - Find all the superior groups and transform to breadcrumbs
            return {
              href: `/themes/${value}`,
              label: value,
            };
          }
        }}
      />

      <HierarchyList
        disableGroup={false}
        disableGutters
        disablePublish
        category="themes"
        maxWidth="md"
        toolbarEl={toolbarEl}
      />
    </>
  );
});

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  const { NEXT_PUBLIC_DEFAULT_LANGUAGE } = process.env;

  if (process.env.NODE_ENV === 'development') {
    await i18n?.reloadResources();
  }

  return {
    props: {
      ...(await serverSideTranslations(locale || NEXT_PUBLIC_DEFAULT_LANGUAGE, [
        'common',
        'themes',
      ])),
    },
  };
};
