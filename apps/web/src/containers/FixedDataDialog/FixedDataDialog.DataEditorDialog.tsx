import _get from 'lodash/get';
import _set from 'lodash/set';
import _unset from 'lodash/unset';
import { useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';
import type { JsonObject } from 'type-fest';

import { EditorDialog, PrimitiveField } from '~web/components';
import { SlideDownTransition } from '~web/themes';
import { useFormFields } from './FixedDataDialog.hooks';
import type { DataEditorDialogProps } from './FixedDataDialog.types';

export default function DataEditorDialog({
  config,
  data,
  mode,
  open,
  onClose,
  onConfirm,
}: DataEditorDialogProps) {
  const [value, setValue] = useState<JsonObject>();
  const { t } = useTranslation();
  const fields = useFormFields(config);

  useEffect(() => {
    if (open) {
      setValue(!data ? {} : JSON.parse(JSON.stringify(data)));

      return () => setValue(undefined);
    }
  }, [open, data]);

  return (
    <EditorDialog
      {...{ open, onClose }}
      icon="faEdit"
      title={t(`widgets:btn-${mode}.fixed-data`)}
      onSubmit={() => onConfirm(value as JsonObject)}
      TransitionComponent={SlideDownTransition}
    >
      {value &&
        fields.map((definition) => (
          <PrimitiveField
            key={definition.path}
            definition={definition}
            label={definition.path}
            name={definition.path}
            size="small"
            variant="outlined"
            value={_get(value, definition.path) as string | number | boolean}
            onChange={(e) => {
              const newValue = typeof e === 'number' ? e : e || undefined;

              if (newValue !== undefined) {
                _set(value, definition.path, newValue);
              } else {
                _unset(value, definition.path);
              }

              setValue({ ...value });
            }}
          />
        ))}
    </EditorDialog>
  );
}
