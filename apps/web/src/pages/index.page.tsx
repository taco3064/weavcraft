import { NextSeo } from 'next-seo';
import { useTranslation } from 'next-i18next';
import type { GetServerSideProps } from 'next';

import { Intro, MainLayout } from '~web/containers';
import { getTranslations } from './common.server.side';
import { makePerPageLayout } from './common.client.side';
import { useNextSeoProps } from '~web/hooks';

export default makePerPageLayout(MainLayout)(function IndexPage() {
  const { t } = useTranslation();
  const seoProps = useNextSeoProps();

  return (
    <>
      <NextSeo
        {...seoProps}
        title={`${t('intro:ttl-welcome.normal')} | ${t('ttl-weavcraft')}`}
        description={t('intro:msg-short-intro')}
      />

      <Intro />
    </>
  );
});

export const getServerSideProps: GetServerSideProps = async (ctx) => ({
  props: {
    ...(await getTranslations(ctx, 'intro')),
  },
});
