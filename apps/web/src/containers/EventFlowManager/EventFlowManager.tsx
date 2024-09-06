import { ReactFlowProvider } from '@xyflow/react';
import { forwardRef } from 'react';
import { useTranslation } from 'next-i18next';
import '@xyflow/react/dist/style.css';

import Editor from './EventFlowManager.Editor';
import { Provider } from '~web/contexts';
import { useInitialization } from './EventFlowManager.hooks';
import type { DoneRef, EventFlowManagerProps } from './EventFlowManager.types';

export default forwardRef<DoneRef, EventFlowManagerProps>(
  function EventFlowManager({ active, config, layouts, onClose }, ref) {
    const { t } = useTranslation();

    const widget = Object.values(layouts).find(
      ({ id }) => id === config.widgetId
    )?.payload;

    const [{ edges, nodes }, onManagerClose] = useInitialization({
      active,
      config,
      onClose,
    });

    return !widget ? null : (
      <ReactFlowProvider>
        <Provider.LayoutSources {...{ layouts }}>
          <Editor
            {...{ ref, edges, nodes }}
            title={active.eventPath}
            description={t(`widgets:lbl-component.${widget.component}`)}
            onClose={onManagerClose}
          />
        </Provider.LayoutSources>
      </ReactFlowProvider>
    );
  }
);
