import { createPortal } from 'react-dom';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import type { GetServerSideProps } from 'next';

import { Breadcrumbs, MainLayout } from '~web/containers';
import { I18N_USER_CONFIG, makePerPageLayout } from '~web/contexts';

export default makePerPageLayout(MainLayout)(function ThemeGroupsPage() {
  const [toolbarEl, setToolbarEl] = useState<HTMLDivElement | null>(null);

  const { t } = useTranslation();
  const { query } = useRouter();
  const group = typeof query.group === 'string' ? query.group : undefined;

  return (
    <>
      <Breadcrumbs
        disableGutters
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

      {toolbarEl && createPortal(<>Theme Styles</>, toolbarEl)}
    </>
  );
});

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(
      locale || I18N_USER_CONFIG.i18n.defaultLocale,
      ['common', 'themes'],
      I18N_USER_CONFIG
    )),
  },
});
