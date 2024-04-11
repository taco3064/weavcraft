import cookie from 'cookie';
import { i18n, useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import type { GetServerSideProps } from 'next';

import { Breadcrumbs, HierarchyList, MainLayout } from '~web/containers';
import { PaletteDisplay, type PortalContainerEl } from '~web/components';
import { TutorialModeProvider, makePerPageLayout } from '~web/contexts';
import { getHierarchyData, getSuperiorHierarchies } from '~web/services';
import type { ThemesPageProps } from './themes.types';

export default makePerPageLayout<ThemesPageProps>(MainLayout)(
  function ThemeGroupsPage({ group, initialData, isTutorialMode, superiors }) {
    const { t } = useTranslation();
    const [toolbarEl, setToolbarEl] = useState<PortalContainerEl>(null);

    const { data = superiors } = useQuery({
      enabled: Boolean(isTutorialMode && group),
      queryKey: [group as string, true],
      queryFn: getSuperiorHierarchies,
    });

    return (
      <TutorialModeProvider enabled={isTutorialMode}>
        <Breadcrumbs
          currentBreadcrumbLabel={group}
          currentPageTitle={!group ? t('ttl-breadcrumbs.themes.label') : group}
          onToolbarMount={setToolbarEl}
          onCatchAllRoutesTransform={(key, value) => {
            if (key === 'group' && typeof value === 'string') {
              return data.map(({ _id, title }) => ({
                href: `/themes/${_id}${isTutorialMode ? '?tutorial' : ''}`,
                label: title,
              }));
            }
          }}
        />

        <HierarchyList
          {...{ initialData, toolbarEl }}
          PreviewComponent={PaletteDisplay}
          category="themes"
          disableGroup={false}
          disableGutters
          disablePublish={false}
          icon="faPalette"
          maxWidth="md"
          superior={group}
        />
      </TutorialModeProvider>
    );
  }
);

export const getServerSideProps: GetServerSideProps<ThemesPageProps> = async ({
  locale,
  query,
  req,
}) => {
  const { NEXT_PUBLIC_DEFAULT_LANGUAGE } = process.env;
  const cookies = cookie.parse(req.headers.cookie || '');
  const url = new URL(req.url as string, 'http://localhost');
  const group = typeof query.group === 'string' ? query.group : undefined;

  const isTutorialMode =
    'tutorial' in Object.fromEntries(new URLSearchParams(url.search));

  if (process.env.NODE_ENV === 'development') {
    await i18n?.reloadResources();
  }

  return !isTutorialMode && !cookies['token']
    ? //* Redirect to home page if not authenticated and not in tutorial mode
      { redirect: { destination: '/themes?tutorial', permanent: false } }
    : {
        props: {
          ...(group && { group }),
          isTutorialMode,

          initialData: isTutorialMode
            ? []
            : await getHierarchyData({
                queryKey: [
                  { category: 'themes', superior: group, withPayload: true },
                ],
              }),

          superiors:
            !group || isTutorialMode
              ? []
              : await getSuperiorHierarchies({ queryKey: [group] }),

          ...(await serverSideTranslations(
            locale || NEXT_PUBLIC_DEFAULT_LANGUAGE,
            ['common', 'themes']
          )),
        },
      };
};
