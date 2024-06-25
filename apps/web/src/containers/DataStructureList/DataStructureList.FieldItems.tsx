import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import { Fragment, useCallback, useState } from 'react';

import ActionToggle from './DataStructureList.ActionToggle';

import {
  useDataFields,
  useFieldChangeHandler,
} from './DataStructureList.hooks';

import type { FieldItemsProps } from './DataStructureList.types';

export default function FieldItems({
  classes,
  paths = [],
  value,
  onChange,
}: FieldItemsProps) {
  const [collapseds, setCollapseds] = useState<Set<string>>(new Set());

  const fields = useDataFields(value);
  const onFieldChange = useFieldChangeHandler(onChange);

  const handleCollapse = useCallback(
    (fieldPath: string, isStructure: boolean) => {
      if (!isStructure) {
        return;
      }

      setCollapseds((prev) => {
        if (prev.has(fieldPath)) {
          prev.delete(fieldPath);
        } else {
          prev.add(fieldPath);
        }

        return new Set(prev);
      });
    },
    []
  );

  return (
    <>
      {fields.map(([fieldPath, subFields]) => {
        const isStructure = Array.isArray(subFields);

        return (
          <Fragment key={fieldPath}>
            <ListItemButton
              {...(isStructure
                ? {
                    selected: !collapseds.has(fieldPath),
                    onClick: () => handleCollapse(fieldPath, isStructure),
                  }
                : {
                    disableRipple: true,
                    disableTouchRipple: true,
                    sx: {
                      background: 'transparent !important',
                      cursor: 'default',
                    },
                  })}
            >
              {!isStructure ? (
                <ListItemIcon className={classes.icon} />
              ) : (
                <ListItemIcon className={classes.icon}>
                  {collapseds.has(fieldPath) ? <ExpandLess /> : <ExpandMore />}
                </ListItemIcon>
              )}

              <ListItemText
                primary={fieldPath}
                primaryTypographyProps={{
                  fontWeight: isStructure ? 600 : 500,
                }}
              />

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
            </ListItemButton>

            {!Array.isArray(subFields) ? null : (
              <Collapse in={!collapseds.has(fieldPath)} sx={{ paddingLeft: 2 }}>
                <FieldItems
                  classes={classes}
                  paths={[...paths, fieldPath]}
                  value={subFields}
                  onChange={onChange}
                />
              </Collapse>
            )}
          </Fragment>
        );
      })}
    </>
  );
}
