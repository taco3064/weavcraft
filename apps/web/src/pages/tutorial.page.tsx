import { i18n, useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import type { GetServerSideProps } from 'next';

import { Breadcrumbs, MainLayout } from '~web/containers';
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
