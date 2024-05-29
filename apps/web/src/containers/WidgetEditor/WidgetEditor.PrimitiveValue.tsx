import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useTranslation } from 'next-i18next';

import { EditorList } from '~web/components';
import type { PrimitiveValueProps } from './WidgetEditor.types';

export default function PrimitiveValue({
  config,
  onClose,
}: PrimitiveValueProps) {
  const { t } = useTranslation();

  return !config ? null : (
    <EditorList
      title={t('widgets:ttl-primitive-value')}
      onClose={onClose}
      render={(classes) => null}
    />
  );
}
