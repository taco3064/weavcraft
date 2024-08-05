import type { GetServerSideProps } from 'next';

import { Intro, MainLayout } from '~web/containers';
import { getTranslations } from './common.server.side';
import { makePerPageLayout } from './common.client.side';

export default makePerPageLayout(MainLayout)(Intro);

export const getServerSideProps: GetServerSideProps = async (ctx) => ({
  props: {
    ...(await getTranslations(ctx, 'intro')),
  },
});
