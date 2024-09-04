import { ReactFlowProvider } from '@xyflow/react';
import { useTranslation } from 'next-i18next';
import '@xyflow/react/dist/style.css';

import Editor from './EventFlowManager.Editor';
import { TodoVariableSourcesProvider } from '~web/contexts';
import { useInitialization } from './EventFlowManager.hooks';
import type { EventFlowManagerProps } from './EventFlowManager.types';

export default function EventFlowManager({
  active,
  config,
  widgets,
  onClose,
}: EventFlowManagerProps) {
  const widget = widgets.find(({ id }) => id === config.widgetId);
  const { t } = useTranslation();

  const [{ edges, nodes }, onManagerClose] = useInitialization({
    active,
    config,
    onClose,
  });

  return !widget ? null : (
    <TodoVariableSourcesProvider widgets={widgets}>
      <ReactFlowProvider>
        <Editor
          {...{ edges, nodes }}
          title={active.eventPath}
          description={t(`widgets:lbl-component.${widget.component}`)}
          onClose={onManagerClose}
        />
      </ReactFlowProvider>
    </TodoVariableSourcesProvider>
  );
}
