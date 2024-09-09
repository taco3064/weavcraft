import TextField from '@mui/material/TextField';
import { useTranslation } from 'next-i18next';
import type { UpdateWidgetTodo } from '@weavcraft/common';

import { DEFAULT_PROPS } from './TodoFields.styles';
import type { FieldsProps } from './TodoFields.types';

export default function UpdateWidgetFields({
  value,
  onChange,
}: FieldsProps<UpdateWidgetTodo>) {
  const { t } = useTranslation('pages');

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
