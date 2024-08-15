import cookie from 'cookie';
import { getSession } from 'next-auth/react';
import { i18n } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import type { GetServerSideProps, GetServerSidePropsContext } from 'next';

import { searchHierarchies, getSuperiorHierarchies } from '~web/services';
import type { BaseHierarchyProps } from './imports.types';

export async function isUserEnvStatus(
  { query, req }: GetServerSidePropsContext,
  ...target: ('tutorial' | 'nontutorial' | 'auth' | 'unauth')[]
) {
  const isAuth = Boolean(await getSession({ req }));

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

export async function getTranslations(
  { locale, req }: GetServerSidePropsContext,
  ...ns: string[]
) {
  const { language } = cookie.parse(req.headers.cookie || '');

  if (process.env.NODE_ENV === 'development') {
    await i18n?.reloadResources();
  }

  return await serverSideTranslations(
    language || locale || process.env.NEXT_PUBLIC_DEFAULT_LANGUAGE,
    ['common', 'tutorial', ...ns]
  );
}

export function getBaseGroupServerSideProps<P>(category: string) {
  const result: GetServerSideProps<BaseHierarchyProps<P>> = async (ctx) => {
    const isTutorialMode = await isUserEnvStatus(ctx, 'tutorial');

    const group =
      typeof ctx.query.group === 'string' ? ctx.query.group : undefined;

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
        ...(await getTranslations(ctx, category)),

        initialData: isTutorialMode
          ? []
          : await searchHierarchies({
              queryKey: [
                {
                  category,
                  superior: group,
                  withPayload: category === 'themes',
                },
              ],
            }),
      },
    };
  };

  return result;
}
