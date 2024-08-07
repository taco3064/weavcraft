import Head from 'next/head';
import { useTranslation } from 'next-i18next';

import type { WeavcraftSEOProps } from './WeavcraftSEO.types';

export default function WeavcraftSEO({
  title,
  description,
  keywords,
  path,
  image,
}: WeavcraftSEOProps) {
  const { t } = useTranslation();
  const fullTitle = `${t('ttl-weavcraft')} | ${title}`;

  return (
    <Head>
      <title>{fullTitle}</title>

      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="og:title" content={fullTitle} />
      <meta name="og:description" content={description} />

      <meta
        name="og:image"
        content={`${process.env.NEXT_PUBLIC_BASE_URL}${
          image || '/imgs/logo.svg'
        }`}
      />

      <meta
        name="og:url"
        content={`${process.env.NEXT_PUBLIC_BASE_URL}${path}`}
      />
    </Head>
  );
}
