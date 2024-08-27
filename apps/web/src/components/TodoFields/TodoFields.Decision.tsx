import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import { DecisionOperatorEnum, type DecisionTodo } from '@weavcraft/common';
import { useTranslation } from 'next-i18next';

import { DEFAULT_PROPS } from './TodoFields.styles';
import type { FieldsProps } from './TodoFields.types';

export default function DecisionFields({
  value,
  onChange,
}: FieldsProps<DecisionTodo>) {
  const { t } = useTranslation('pages');

  return (
    <>
      <TextField
        {...DEFAULT_PROPS}
        required
        select
        label={t('lbl-decision-source')}
        value={value?.source ? JSON.stringify(value.source) : ''}
        onChange={(e) =>
          onChange({ ...value, source: JSON.parse(e.target.value) })
        }
      />

      <TextField
        {...DEFAULT_PROPS}
        required
        select
        label={t('lbl-decision-operator')}
        value={value?.operator || ''}
        onChange={(e) =>
          onChange({
            ...value,
            operator: e.target.value as DecisionOperatorEnum,
          })
        }
      >
        {Object.values(DecisionOperatorEnum).map((option) => (
          <MenuItem key={option} value={option}>
            {t(`opt-decision-operators.${option}`)}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        {...DEFAULT_PROPS}
        select
        label={t('lbl-decision-target')}
        value={value?.target ? JSON.stringify(value.target) : ''}
        onChange={(e) =>
          onChange({ ...value, target: JSON.parse(e.target.value) })
        }
      />
    </>
  );
}
