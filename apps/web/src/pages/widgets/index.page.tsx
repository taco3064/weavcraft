import { MainLayout } from '~web/containers';
import { getBaseGroupPage } from '../common.client.side';
import { getBaseGroupServerSideProps } from '../common.server.side';
import { makePerPageLayout } from '~web/contexts';

import type { BaseHierarchyProps } from '../imports.types';

const category = 'widgets';

export default makePerPageLayout<BaseHierarchyProps>(MainLayout)(
  getBaseGroupPage(category)
);

export const getServerSideProps = getBaseGroupServerSideProps(category);
