import { MainLayout } from '~web/containers';
import { getBaseGroupPage, makePerPageLayout } from '../common.client.side';
import { getBaseGroupServerSideProps } from '../common.server.side';

import type { BaseHierarchyProps } from '../imports.types';

const category = 'pages';

export default makePerPageLayout<BaseHierarchyProps>(MainLayout)(
  getBaseGroupPage(category, {
    disablePublish: true,
  })
);

export const getServerSideProps = getBaseGroupServerSideProps(category);
