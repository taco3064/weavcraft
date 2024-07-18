import type { GetServerSideProps } from 'next';

import { Intro, MainLayout } from '~web/containers';
import { getServerSideTranslations } from './pages.utils';
import { makePerPageLayout } from '~web/contexts';

export default makePerPageLayout(MainLayout)(Intro);

export const getServerSideProps: GetServerSideProps = async (ctx) => ({
  props: {
    ...(await getServerSideTranslations(ctx, 'intro')),
  },
});
