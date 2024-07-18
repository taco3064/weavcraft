import { MainLayout } from '~web/containers';
import { getBaseGroupPage } from '../pages.common';
import { getBaseGroupServerSideProps } from '../pages.utils';
import { makePerPageLayout } from '~web/contexts';

import type { BaseHierarchyProps } from '../imports.types';

const category = 'widgets';

export default makePerPageLayout<BaseHierarchyProps>(MainLayout)(
  getBaseGroupPage(category)
);

export const getServerSideProps = getBaseGroupServerSideProps(category);
