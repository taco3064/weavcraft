import Toolbar from '@mui/material/Toolbar';
import { TreeItem } from '@mui/x-tree-view';

import ActionToggle from './DataStructureList.ActionToggle';
import { useMainStyles } from './DataStructureList.styles';

import {
  useDataFields,
  useFieldChangeHandler,
} from './DataStructureList.hooks';

import type { DataStructureListProps } from './DataStructureList.types';

export default function FieldItems({
  paths = [],
  value,
  onChange,
}: Omit<DataStructureListProps, 'root'>) {
  const { classes } = useMainStyles();

  const fields = useDataFields(value);
  const onFieldChange = useFieldChangeHandler(onChange);

  return (
    <>
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
                    <ActionToggle
                      value={fieldPath}
                      variant={isStructure ? 'structure' : 'field'}
                      onActionToggle={({ mode, value: newFieldPath, type }) => {
                        if (mode === 'add' && isStructure) {
                          onFieldChange(subFields, {
                            fieldPath: newFieldPath,
                            paths: [...paths, fieldPath],
                            isStructure: type === 'structure',
                          });
                        } else if (mode === 'edit') {
                          onFieldChange(value, {
                            fieldPath: newFieldPath,
                            oldFieldPath: fieldPath,
                            paths,
                            isStructure,
                          });
                        } else if (mode === 'delete') {
                          onChange({
                            fieldPath,
                            oldFieldPath: fieldPath,
                            paths,
                            isStructure,
                          });
                        }
                      }}
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
