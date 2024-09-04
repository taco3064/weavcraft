import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'next-i18next';
import { TodoEnum } from '@weavcraft/common';
import type * as Common from '@weavcraft/common';

import DecisionFields from './TodoFields.Decision';
import FetchDataFields from './TodoFields.FetchData';
import IterateFields from './TodoFields.Iterate';
import UpdateWidgetFields from './TodoFields.UpdateWidget';
import VariableFields from './TodoFields.Variables';
import type { TodoFieldsProps } from './TodoFields.types';

export default function TodoFields<T extends Common.Todos>({
  value,
  onChange,
}: TodoFieldsProps<T>) {
  const { t } = useTranslation('pages');

  return (
    <>
      <Typography paragraph variant="caption" color="text.secondary">
        {t(`msg-todo-types.${value.type}`)}
      </Typography>

      <TextField
        fullWidth
        variant="filled"
        color="secondary"
        size="small"
        label={t('lbl-todo-description')}
        value={value.description}
        onChange={(e) => onChange({ ...value, description: e.target.value })}
      />

      {value.type === TodoEnum.Decision && (
        <DecisionFields
          value={value.config as Common.DecisionTodo['config']}
          onChange={(config) => onChange({ ...value, config })}
        />
      )}

      {value.type === TodoEnum.FetchData && (
        <FetchDataFields
          value={value.config as Common.FetchDataTodo['config']}
          onChange={(config) => onChange({ ...value, config })}
        />
      )}

      {value.type === TodoEnum.Iterate && (
        <IterateFields
          value={value.config as Common.IterateTodo['config']}
          onChange={(config) => onChange({ ...value, config })}
        />
      )}

      {value.type === TodoEnum.UpdateWidget && (
        <UpdateWidgetFields
          value={value.config as Common.UpdateWidgetTodo['config']}
          onChange={(config) => onChange({ ...value, config })}
        />
      )}

      {value.type === TodoEnum.Variables && (
        <VariableFields
          value={value.config as Common.VariableTodo['config']}
          onChange={(config) => onChange({ ...value, config })}
        />
      )}
    </>
  );
}
