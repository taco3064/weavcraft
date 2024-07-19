import cookie from 'cookie';
import { i18n } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import type { GetServerSideProps } from 'next';
import type { GetServerSidePropsContext } from 'next';

import { getHierarchyData, getSuperiorHierarchies } from '~web/services';
import type { BaseHierarchyProps } from './imports.types';

export async function isUserEnvStatus(
  { query, req }: GetServerSidePropsContext,
  ...target: ('tutorial' | 'nontutorial' | 'auth' | 'unauth')[]
) {
  const { cookies } = req;
  const isAuth = Boolean(cookies['token']);

  const isTutorialMode =
    query.tutorial === process.env.NEXT_PUBLIC_TUTORIAL_TOKEN;

  const status = {
    tutorial: isTutorialMode,
    nontutorial: !isTutorialMode,
    auth: isAuth,
    unauth: !isAuth,
  };

  return target.length > 0 && target.every((t) => status[t]);
}

export async function getServerSideTranslations(
  { req }: GetServerSidePropsContext,
  ...ns: string[]
) {
  const { language = process.env.NEXT_PUBLIC_DEFAULT_LANGUAGE } = cookie.parse(
    req.headers.cookie || ''
  );

  if (process.env.NODE_ENV === 'development') {
    await i18n?.reloadResources();
  }

  return await serverSideTranslations(language, ['common', 'tutorial', ...ns]);
}

export function getBaseGroupServerSideProps<P>(category: string) {
  const result: GetServerSideProps<BaseHierarchyProps<P>> = async (ctx) => {
    const group =
      typeof ctx.query.group === 'string' ? ctx.query.group : undefined;

    const isTutorialMode = await isUserEnvStatus(ctx, 'tutorial');

    const initialSuperiors =
      !group || isTutorialMode
        ? []
        : await getSuperiorHierarchies({ queryKey: [group] });

    if (await isUserEnvStatus(ctx, 'unauth', 'nontutorial')) {
      //* Redirect to home page if not authenticated and not in tutorial mode
      return { redirect: { destination: '/', permanent: false } };
    } else if (!isTutorialMode && group && !initialSuperiors.length) {
      //* Redirect to 404 page if group does not exist
      return { notFound: true };
    }

    return {
      props: {
        initialSuperiors,
        ...(group && { group }),
        ...(await getServerSideTranslations(ctx, category)),

        initialData: isTutorialMode
          ? []
          : await getHierarchyData({
              queryKey: [{ category, superior: group, withPayload: true }],
            }),
      },
    };
  };

  return result;
}
