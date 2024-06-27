import Core from '@weavcraft/core';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { useTranslation } from 'next-i18next';

import { ConfirmDialog, EditorDialog, MenuDialog } from '~web/components';
import { SlideDownTransition, SlideUpTransition } from '~web/themes';
import type { MenuItemOptions } from '../imports.types';

import type {
  ActionToggleProps,
  EditingState,
} from './DataStructureList.types';

export default function ActionToggle({
  TransitionComponent = SlideUpTransition,
  variant,
  value,
  onActionToggle,
}: ActionToggleProps) {
  const { t } = useTranslation();

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [editing, setEditing] = useState<EditingState>();

  const mode = editing?.fieldPath ? 'edit' : 'add';

  //* Action Menu Options
  const fieldOptions: MenuItemOptions[] = !value
    ? []
    : [
        { icon: 'faEdit', label: 'widgets:btn-edit.field' },
        { icon: 'faTrash', label: `widgets:btn-delete.${variant}` },
      ];

  const structureOptions: MenuItemOptions[] =
    variant !== 'structure'
      ? []
      : [
          { icon: 'faPlus', label: 'widgets:btn-add.field' },
          { icon: 'faFileCirclePlus', label: 'widgets:btn-add.structure' },
        ];

  const divider: MenuItemOptions[] =
    !fieldOptions.length || !structureOptions.length ? [] : ['divider'];

  return (
    <>
      <IconButton color="info" onClick={() => setMenuOpen(true)}>
        <Core.Icon code="faGear" />
      </IconButton>

      {value && (
        <ConfirmDialog
          open={confirmOpen}
          subject={t('ttl-delete-confirm')}
          message={t('widgets:msg-delete-confirm.field', {
            field: value,
          })}
          onClose={() => setConfirmOpen(false)}
          onConfirm={() =>
            onActionToggle({ mode: 'delete', value, type: variant })
          }
          TransitionComponent={
            TransitionComponent === SlideUpTransition
              ? SlideDownTransition
              : SlideUpTransition
          }
        />
      )}

      <MenuDialog
        TransitionComponent={TransitionComponent}
        items={[...structureOptions, ...divider, ...fieldOptions]}
        open={menuOpen}
        subtitle={value}
        title={t('widgets:ttl-data-structure-action')}
        onClose={() => setMenuOpen(false)}
        onItemClick={(label) => {
          switch (label) {
            case 'widgets:btn-add.field':
              return setEditing({ fieldPath: '', type: 'field' });
            case 'widgets:btn-add.structure':
              return setEditing({ fieldPath: '', type: 'structure' });
            case 'widgets:btn-edit.field':
              return setEditing({ fieldPath: value as string, type: variant });
            case `widgets:btn-delete.${variant}`:
              return setConfirmOpen(true);
          }
        }}
      />

      <EditorDialog
        icon="faBezierCurve"
        open={editing !== undefined}
        title={t(`widgets:ttl-field-path.${mode}.${editing?.type}`)}
        onClose={() => setEditing(undefined)}
        onSubmit={(formData) => {
          const value = formData.get('fieldPath') as string;

          setEditing(undefined);

          onActionToggle({
            mode,
            type: editing?.type as EditingState['type'],
            value,
          });
        }}
        TransitionComponent={
          TransitionComponent === SlideUpTransition
            ? SlideDownTransition
            : SlideUpTransition
        }
      >
        <TextField
          autoFocus
          fullWidth
          required
          key={editing ? 'open' : 'close'}
          color="secondary"
          name="fieldPath"
          label={t('widgets:lbl-field-path')}
          defaultValue={editing?.fieldPath}
          inputProps={{
            pattern: '[a-zA-Z0-9 ,@&\\|\\.\\-\\(\\)\\u4e00-\\u9fa5]*',
          }}
        />
      </EditorDialog>
    </>
  );
}
