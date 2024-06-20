import Toolbar from '@mui/material/Toolbar';
import { TreeItem } from '@mui/x-tree-view';

import ActionToggle from './DataStructureView.ActionToggle';
import { useMainStyles } from './DataStructureView.styles';

import {
  useDataFields,
  useFieldChangeHandler,
} from './DataStructureView.hooks';

import type { DataStructureViewProps } from './DataStructureView.types';

export default function FieldItems({
  paths = [],
  value,
  onChange,
}: Omit<DataStructureViewProps, 'root'>) {
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
                      onFieldAdd={
                        !isStructure
                          ? undefined
                          : (field, isStructure) =>
                              onFieldChange(subFields, {
                                fieldPath: field,
                                paths: [...paths, fieldPath],
                                isStructure,
                              })
                      }
                      onFieldChange={(field, isStructure) =>
                        onFieldChange(value, {
                          fieldPath: field,
                          oldFieldPath: fieldPath,
                          paths,
                          isStructure,
                        })
                      }
                      onFieldRemove={(_field, isStructure) =>
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
