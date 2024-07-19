import { MainLayout } from '~web/containers';
import { PaletteViewer } from '~web/components';
import { getBaseGroupPage } from '../common.client.side';
import { getBaseGroupServerSideProps } from '../common.server.side';
import { makePerPageLayout } from '~web/contexts';

import type { BaseHierarchyProps, ThemePalette } from '../imports.types';

const category = 'themes';

export default makePerPageLayout<BaseHierarchyProps<ThemePalette>>(MainLayout)(
  getBaseGroupPage(category, {
    renderContent: (palette) => (
      <PaletteViewer
        disableBorder
        disableBorderRadius
        config={palette}
        size={200}
      />
    ),
  })
);

export const getServerSideProps =
  getBaseGroupServerSideProps<ThemePalette>(category);
