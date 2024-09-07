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
    const { [config.id]: hierarchy } = layouts;
    const { t } = useTranslation();

    const [{ edges, nodes }, onManagerClose] = useInitialization({
      active,
      config,
      onClose,
    });

    return !hierarchy?.payload ? null : (
      <ReactFlowProvider>
        <Provider.HierarchyData data={layouts}>
          <Editor
            {...{ ref, edges, nodes }}
            title={active.eventPath}
            description={t(
              `widgets:lbl-component.${hierarchy.payload.component}`
            )}
            onClose={onManagerClose}
          />
        </Provider.HierarchyData>
      </ReactFlowProvider>
    );
  }
);
