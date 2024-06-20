import Core from '@weavcraft/core';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import { TreeItem } from '@mui/x-tree-view';
import { useState } from 'react';
import { useTranslation } from 'next-i18next';

import AddButtons from './DataStructureView.AddButtons';
import FieldModifyDialog from './DataStructureView.FieldModifyDialog';
import { ConfirmToggle } from '~web/components';
import { useMainStyles } from './DataStructureView.styles';

import {
  useDataFields,
  useFieldChangeHandler,
} from './DataStructureView.hooks';

import type {
  DataStructureViewProps,
  EditingState,
} from './DataStructureView.types';

export default function FieldItems({
  paths = [],
  value,
  onChange,
}: Omit<DataStructureViewProps, 'root'>) {
  const [editing, setEditing] = useState<EditingState>();

  const { t } = useTranslation();
  const { classes } = useMainStyles();

  const fields = useDataFields(value);
  const onFieldChange = useFieldChangeHandler(onChange);

  return (
    <>
      <FieldModifyDialog
        open={editing !== undefined}
        title={t(`widgets:ttl-field-path.edit.${editing?.type}`)}
        value={editing?.fieldPath}
        onClose={() => setEditing(undefined)}
        onConfirm={(fieldPath) => {
          setEditing(undefined);

          onFieldChange(value, {
            fieldPath,
            oldFieldPath: editing?.fieldPath,
            paths,
            isStructure: editing?.type === 'structure',
          });
        }}
      />

      {fields.map(([fieldPath, subFields]) => {
        const isStructure = Array.isArray(subFields);

        return (
          <TreeItem
            key={fieldPath}
            classes={{ label: classes.row }}
            itemId={`${paths.join(':')}-${fieldPath}`}
            label={
              <>
                {fieldPath}

                {onChange && (
                  <Toolbar
                    disableGutters
                    variant="dense"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {isStructure && (
                      <AddButtons
                        onChange={(value, isStructure) =>
                          onFieldChange(subFields, {
                            fieldPath: value,
                            oldFieldPath: undefined,
                            paths: [...paths, fieldPath],
                            isStructure,
                          })
                        }
                      />
                    )}

                    <Divider orientation="vertical" flexItem />

                    <Tooltip title={t('widgets:btn-edit.field')}>
                      <IconButton
                        onClick={() =>
                          setEditing({
                            fieldPath,
                            type: isStructure ? 'structure' : 'field',
                          })
                        }
                      >
                        <Core.Icon code="faPenToSquare" color="warning" />
                      </IconButton>
                    </Tooltip>

                    <ConfirmToggle
                      subject={t('ttl-delete-confirm')}
                      message={t('widgets:msg-delete-confirm.field', {
                        field: fieldPath,
                      })}
                      toggle={
                        <Tooltip
                          title={t(
                            `widgets:btn-delete.${
                              isStructure ? 'structure' : 'field'
                            }`
                          )}
                        >
                          <IconButton>
                            <Core.Icon code="faTrash" color="disabled" />
                          </IconButton>
                        </Tooltip>
                      }
                      onConfirm={() =>
                        onChange({
                          fieldPath,
                          oldFieldPath: fieldPath,
                          paths,
                          isStructure,
                        })
                      }
                    />
                  </Toolbar>
                )}
              </>
            }
          >
            {!Array.isArray(subFields) ? null : (
              <FieldItems
                paths={[...paths, fieldPath]}
                value={subFields}
                onChange={onChange}
              />
            )}
          </TreeItem>
        );
      })}
    </>
  );
}
