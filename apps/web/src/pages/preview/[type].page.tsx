import { ResponsiveGrid, ResponsiveItem } from '@weavcraft/core';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { useHierarchyWidgets, useWidgetRender } from '~web/hooks';
import { withCorePropsDefinition } from '~web/contexts';
import type { PageLayoutConfigs } from '../imports.types';

export default withCorePropsDefinition(function PreviewPage() {
  const { query } = useRouter();
  const { id, mode, type } = query as Record<string, string>;

  const [config, setConfig] = useState<PageLayoutConfigs>();

  const [widgets] = useHierarchyWidgets(
    (type === 'pages' && config?.layouts) || [],
    mode === 'tutorial'
  );

  const generate = useWidgetRender((WidgetEl, { key, props }) => (
    <WidgetEl key={key} {...props} />
  ));

  useEffect(() => {
    if (id && global.window?.parent) {
      const config = global.window?.parent.sessionStorage.getItem(
        decodeURIComponent(id)
      );

      setConfig(() => {
        if (config && type === 'pages') {
          return JSON.parse(config) as PageLayoutConfigs;
        }

        return undefined;
      });
    }
  }, [id, type]);

  return (
    <>
      {type === 'pages' && config && (
        <ResponsiveGrid
          enableGridlines
          items={config.layouts}
          cols={process.env.NEXT_PUBLIC_DEFAULT_COLS}
          rowHeight={process.env.NEXT_PUBLIC_DEFAULT_ROW_HEIGHT}
          renderItem={(layout) => {
            const { id, spans, widgetId } = layout;
            const { [widgetId]: hierarchy } = widgets;

            return (
              <ResponsiveItem {...{ id, spans }} disableToolbar>
                {hierarchy?.payload &&
                  generate(hierarchy.payload, {
                    dataStructure: hierarchy.payload.dataStructure,
                  })}
              </ResponsiveItem>
            );
          }}
        />
      )}
    </>
  );
});