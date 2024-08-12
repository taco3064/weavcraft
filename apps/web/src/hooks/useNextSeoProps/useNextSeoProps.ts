import { useMemo } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import type { NextSeoProps } from 'next-seo';

export function useNextSeoProps(): Pick<
  NextSeoProps,
  'canonical' | 'languageAlternates' | 'openGraph'
> {
  const { t } = useTranslation();
  const { locales, asPath } = useRouter();

  return {
    canonical: `${process.env.NEXT_PUBLIC_BASE_URL}${asPath}`,
    languageAlternates: locales?.map((locale) => ({
      hrefLang: locale as string,
      href: [
        process.env.NEXT_PUBLIC_BASE_URL,
        locale === 'en' ? '' : `/${locale}`,
        asPath,
      ].join(''),
    })),
    openGraph: {
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
    },
  };
}
