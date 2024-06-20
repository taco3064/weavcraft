import Core from '@weavcraft/core';
import IconButton from '@mui/material/IconButton';
import Slide from '@mui/material/Slide';
import TextField from '@mui/material/TextField';
import { forwardRef, useState } from 'react';
import { useTranslation } from 'next-i18next';

import { ConfirmDialog, EditorDialog, MenuDialog } from '~web/components';
import type { MenuItemOptions, SubTransitionProps } from '../imports.types';

import type {
  ActionToggleProps,
  EditingState,
} from './DataStructureView.types';

const SubTransition = forwardRef<unknown, SubTransitionProps>(
  function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
  }
);

export default function ActionToggle({
  variant,
  value,
  onFieldAdd,
  onFieldChange,
  onFieldRemove,
}: ActionToggleProps) {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [editing, setEditing] = useState<EditingState>();
  const { t } = useTranslation();

  const fieldOptions: MenuItemOptions[] = !value
    ? []
    : [
        { icon: 'faEdit', label: 'widgets:btn-edit.field' },
        { icon: 'faTrash', label: `widgets:btn-delete.${variant}` },
      ];

  const structureOptions: MenuItemOptions[] = !onFieldAdd
    ? []
    : [
        { icon: 'faPlus', label: 'widgets:btn-add.field' },
        { icon: 'faCirclePlus', label: 'widgets:btn-add.structure' },
      ];

  const divider: MenuItemOptions[] =
    !fieldOptions.length || !structureOptions.length ? [] : ['divider'];

  return (
    <>
      <IconButton color="info" onClick={() => setMenuOpen(true)}>
        <Core.Icon code="faGear" />
      </IconButton>

      {value && onFieldRemove && (
        <ConfirmDialog
          TransitionComponent={SubTransition}
          open={confirmOpen}
          subject={t('ttl-delete-confirm')}
          onClose={() => setConfirmOpen(false)}
          onConfirm={() => onFieldRemove(value, variant === 'structure')}
          message={t('widgets:msg-delete-confirm.field', {
            field: value,
          })}
        />
      )}

      <MenuDialog
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
        TransitionComponent={SubTransition}
        icon="faBezierCurve"
        open={editing !== undefined}
        onClose={() => setEditing(undefined)}
        onSubmit={(formData) => {
          const fieldPath = formData.get('fieldPath') as string;

          setEditing(undefined);

          if (!editing?.fieldPath) {
            onFieldAdd?.(fieldPath, editing?.type === 'structure');
          } else {
            onFieldChange?.(fieldPath, editing?.type === 'structure');
          }
        }}
        title={t(
          `widgets:ttl-field-path.${editing?.fieldPath ? 'edit' : 'add'}.${
            editing?.type
          }`
        )}
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
            pattern: '[a-zA-Z0-9 ,@&\\.\\-\\(\\)\\u4e00-\\u9fa5]*',
          }}
        />
      </EditorDialog>
    </>
  );
}
