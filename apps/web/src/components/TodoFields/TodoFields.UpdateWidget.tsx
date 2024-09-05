import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import { useTranslation } from 'next-i18next';
import type { UpdateWidgetTodo } from '@weavcraft/common';

import { DEFAULT_PROPS } from './TodoFields.styles';
// import { useLayoutOptions } from '~web/contexts';
import type { FieldsProps } from './TodoFields.types';

export default function UpdateWidgetFields({
  // nodeId,
  value,
  onChange,
}: FieldsProps<UpdateWidgetTodo>) {
  const { t } = useTranslation('pages');

  // const layouts = useLayoutOptions(nodeId);

  return (
    <>
      <TextField
        {...DEFAULT_PROPS}
        required
        select
        label={t('lbl-update-source')}
        value={value?.source ? JSON.stringify(value.source) : ''}
        onChange={(e) =>
          onChange({ ...value, source: JSON.parse(e.target.value) })
        }
      />

      <TextField
        {...DEFAULT_PROPS}
        required
        select
        label={t('lbl-update-layout')}
        value={value?.layoutId || ''}
        onChange={(e) => onChange({ ...value, layoutId: e.target.value })}
      />

      <TextField
        {...DEFAULT_PROPS}
        required
        select
        disabled={!value?.layoutId}
        label={t('lbl-update-paths')}
        value={value?.dataPath ? JSON.stringify(value.dataPath) : ''}
        onChange={(e) =>
          onChange({ ...value, dataPath: JSON.parse(e.target.value) })
        }
      />
    </>
  );
}
