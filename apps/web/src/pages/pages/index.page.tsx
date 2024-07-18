import { MainLayout } from '~web/containers';
import { getBaseGroupPage } from '../pages.common';
import { getBaseGroupServerSideProps } from '../pages.utils';
import { makePerPageLayout } from '~web/contexts';

import type { BaseHierarchyProps } from '../imports.types';

const category = 'pages';

export default makePerPageLayout<BaseHierarchyProps>(MainLayout)(
  getBaseGroupPage(category, {
    disablePublish: true,
  })
);

export const getServerSideProps = getBaseGroupServerSideProps(category);
