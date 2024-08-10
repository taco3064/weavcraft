import { NextSeo } from 'next-seo';
import { useTranslation } from 'next-i18next';
import type { GetServerSideProps } from 'next';

import { Intro, MainLayout } from '~web/containers';
import { getTranslations } from './common.server.side';
import { makePerPageLayout } from './common.client.side';

export default makePerPageLayout(MainLayout)(function IndexPage() {
  const { t } = useTranslation();

  return (
    <>
      <NextSeo
        title={`${t('intro:ttl-welcome.normal')} | ${t('ttl-weavcraft')}`}
        description={t('intro:msg-short-intro')}
        canonical={`${process.env.NEXT_PUBLIC_BASE_URL}/`}
        openGraph={{
          title: t('ttl-weavcraft'),
          description: t('msg-short-intro'),
          url: process.env.NEXT_PUBLIC_BASE_URL,
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

      <Intro />
    </>
  );
});

export const getServerSideProps: GetServerSideProps = async (ctx) => ({
  props: {
    ...(await getTranslations(ctx, 'intro')),
  },
});
