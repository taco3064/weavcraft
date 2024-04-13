import { useTranslation } from 'next-i18next';
import type { GetServerSideProps } from 'next';

import { Breadcrumbs, MainLayout } from '~web/containers';
import { getServerSideTranslations } from './pages.utils';
import { makePerPageLayout } from '~web/contexts';

export default makePerPageLayout(MainLayout)(function TutorialsPage() {
  const { t } = useTranslation();

  return (
    <>
      <Breadcrumbs currentPageTitle={t('ttl-breadcrumbs.tutorial.label')} />
      Tutorial List
    </>
  );
});

export const getServerSideProps: GetServerSideProps = async (ctx) => ({
  props: {
    ...(await getServerSideTranslations(ctx)),
  },
});
