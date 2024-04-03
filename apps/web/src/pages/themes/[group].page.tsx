import { i18n, useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useState } from 'react';
import type { GetServerSideProps } from 'next';

import { Breadcrumbs, HierarchyList, MainLayout } from '~web/containers';
import { getHierarchyData } from '~web/services';
import { makePerPageLayout } from '~web/contexts';
import type { PortalContainerEl } from '~web/components';
import type { ThemesGroupProps } from './themes.types';

export default makePerPageLayout<ThemesGroupProps>(MainLayout)(
  function ThemeGroupsPage({ group, initialData }) {
    const { t } = useTranslation();
    const [toolbarEl, setToolbarEl] = useState<PortalContainerEl>(null);

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
          {...{ initialData, toolbarEl }}
          category="themes"
          disableGroup={false}
          disableGutters
          disablePublish={false}
          icon="faPalette"
          maxWidth="md"
          superior={group}
        />
      </>
    );
  }
);

export const getServerSideProps: GetServerSideProps = async ({
  locale,
  query,
}) => {
  const { NEXT_PUBLIC_DEFAULT_LANGUAGE } = process.env;
  const group = typeof query.group === 'string' ? query.group : undefined;

  if (process.env.NODE_ENV === 'development') {
    await i18n?.reloadResources();
  }

  return {
    props: {
      initialData: await getHierarchyData({
        queryKey: [{ category: 'themes', superior: group }],
      }),

      ...(group && { group }),
      ...(await serverSideTranslations(locale || NEXT_PUBLIC_DEFAULT_LANGUAGE, [
        'common',
        'themes',
      ])),
    },
  };
};
