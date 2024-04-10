import cookie from 'cookie';
import { i18n, useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useState } from 'react';
import type { GetServerSidePropsContext } from 'next';

import { Breadcrumbs, HierarchyList, MainLayout } from '~web/containers';
import { PaletteDisplay, type PortalContainerEl } from '~web/components';
import { getHierarchyData, getSuperiorHierarchies } from '~web/services';
import { makePerPageLayout } from '~web/contexts';
import type { ThemesPageProps } from './themes.types';

export default makePerPageLayout<ThemesPageProps>(MainLayout)(
  function ThemeGroupsPage({ group, initialData, isInTutorial, superiors }) {
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
              return superiors.map(({ _id, title }) => ({
                href: `/themes/${_id}`,
                label: title,
              }));
            }
          }}
        />

        <HierarchyList
          {...{ initialData, isInTutorial, toolbarEl }}
          PreviewComponent={PaletteDisplay}
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

export const getServerSideProps = async (
  { locale, query, req }: GetServerSidePropsContext,
  isInTutorial = false
) => {
  const { NEXT_PUBLIC_DEFAULT_LANGUAGE } = process.env;
  const cookies = cookie.parse(req.headers.cookie || '');
  const group = typeof query.group === 'string' ? query.group : undefined;

  if (process.env.NODE_ENV === 'development') {
    await i18n?.reloadResources();
  }

  return !isInTutorial && !cookies['token']
    ? //* Redirect to home page if not authenticated and not in tutorial mode
      { redirect: { destination: '/', permanent: false } }
    : {
        props: {
          isInTutorial,

          initialData: await getHierarchyData({
            queryKey: [
              { category: 'themes', superior: group, withPayload: true },
              isInTutorial,
            ],
          }),

          superiors: !group
            ? []
            : await getSuperiorHierarchies({ queryKey: [group, isInTutorial] }),

          ...(group && { group }),
          ...(await serverSideTranslations(
            locale || NEXT_PUBLIC_DEFAULT_LANGUAGE,
            ['common', 'themes']
          )),
        },
      };
};
