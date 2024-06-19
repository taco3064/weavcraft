import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import ButtonGroup from '@mui/material/ButtonGroup';
import PostAddIcon from '@mui/icons-material/PostAdd';
import { Fragment, useState } from 'react';
import { SimpleTreeView, TreeItem } from '@mui/x-tree-view';
import { useTranslation } from 'next-i18next';

import FieldModifyDialog from './DataStructureView.FieldModifyDialog';
import { useMainStyles } from './DataStructureView.styles';
import type { DataStructureViewProps } from './DataStructureView.types';

export default function DataStructureView({
  paths = [],
  root,
  value,
  onChange,
}: DataStructureViewProps) {
  const Container = root ? SimpleTreeView : Fragment;

  const { t } = useTranslation();
  const { classes } = useMainStyles();

  const [editing, setEditing] = useState<{
    fieldPath: string;
    type: 'field' | 'structure';
  }>();

  return (
    <>
      <FieldModifyDialog
        open={editing !== undefined}
        value={editing?.fieldPath}
        onClose={() => setEditing(undefined)}
        onConfirm={(fieldPath) => {
          setEditing(undefined);

          onChange({
            fieldPath,
            oldFieldPath: editing?.fieldPath || undefined,
            paths,
            isStructure: editing?.type === 'structure',
          });
        }}
        title={t(
          `widgets:ttl-field-path.${!editing?.fieldPath ? 'add' : 'edit'}.${
            editing?.type
          }`
        )}
      />

      <Container sx={{ width: '100%' }}>
        <TreeItem
          itemId={`${paths.join(':')}-toolbar`}
          classes={{ content: classes.toolbar }}
          label={
            <ButtonGroup
              variant="contained"
              className={classes.buttons}
              onClick={(e) => e.stopPropagation()}
            >
              <Button
                color="info"
                startIcon={<AddIcon />}
                onClick={() => setEditing({ fieldPath: '', type: 'field' })}
              >
                {t('widgets:btn-add-field')}
              </Button>

              <Button
                color="success"
                endIcon={<PostAddIcon />}
                onClick={() => setEditing({ fieldPath: '', type: 'structure' })}
              >
                {t('widgets:btn-add-structure')}
              </Button>
            </ButtonGroup>
          }
        />

        {value
          .sort((field1, field2) => {
            const [path1, sub1 = []] = Array.isArray(field1)
              ? field1
              : [field1];

            const [path2, sub2 = []] = Array.isArray(field2)
              ? field2
              : [field2];

            return sub1.length - sub2.length || path1.localeCompare(path2);
          })
          .map((field) => {
            const [fieldPath, subFields] = Array.isArray(field)
              ? field
              : [field];

            return (
              <TreeItem
                key={fieldPath}
                itemId={`${paths.join(':')}-${fieldPath}`}
                label={fieldPath}
              >
                {!Array.isArray(subFields) ? null : (
                  <DataStructureView
                    paths={[...paths, fieldPath]}
                    value={subFields}
                    onChange={onChange}
                  />
                )}
              </TreeItem>
            );
          })}
      </Container>
    </>
  );
}
