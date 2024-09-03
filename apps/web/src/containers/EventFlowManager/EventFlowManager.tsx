import { ReactFlowProvider } from '@xyflow/react';
import { useTranslation } from 'next-i18next';
import '@xyflow/react/dist/style.css';

import Editor from './EventFlowManager.Editor';
import { useInitialization } from './EventFlowManager.hooks';
import type { EventFlowManagerProps } from './EventFlowManager.types';

export default function EventFlowManager({
  active,
  config,
  widget,
  onClose,
}: EventFlowManagerProps) {
  const { t } = useTranslation();

  const [{ edges, nodes }, onManagerClose] = useInitialization({
    active,
    config,
    onClose,
  });

  return (
    <ReactFlowProvider>
      <Editor
        {...{ edges, nodes }}
        title={active.eventPath}
        description={t(`widgets:lbl-component.${widget.payload.component}`)}
        onClose={onManagerClose}
      />
    </ReactFlowProvider>
  );
}
