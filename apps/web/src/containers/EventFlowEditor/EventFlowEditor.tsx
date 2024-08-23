import AccountTreeIcon from '@mui/icons-material/AccountTree';
import { useTranslation } from 'next-i18next';

import { EditorList } from '~web/components';
import type { EventFlowEditorProps } from './EventFlowEditor.types';

export default function EventFlowEditor({
  active,
  config,
  widget,
  onChange,
  onClose,
}: EventFlowEditorProps) {
  const { t } = useTranslation();

  console.log(config, onChange);

  return (
    <EditorList
      title={active.eventPath}
      description={t(`widgets:lbl-component.${widget.payload.component}`)}
      icon={<AccountTreeIcon color="primary" />}
      onClose={onClose}
      render={(classes) => null}
    />
  );
}
