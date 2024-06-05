/* eslint-disable @typescript-eslint/no-explicit-any */
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import Core from '@weavcraft/core';
import DialpadIcon from '@mui/icons-material/Dialpad';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MneuItem from '@mui/material/MenuItem';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import SwipeIcon from '@mui/icons-material/Swipe';
import TextField from '@mui/material/TextField';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import { forwardRef, useMemo, type ReactNode } from 'react';
import type { PrimitiveValueProp } from '@weavcraft/common';

import { usePropsDefinition } from '~web/contexts';
import type { PrimitiveFields, SettingPanelProps } from './WidgetEditor.types';

export default forwardRef<
  HTMLUListElement,
  SettingPanelProps<PrimitiveValueProp>
>(function PrimitiveList({ classes, config, onChange }, ref) {
  const { widget, props = {} } = config;
  const { getDefinition } = usePropsDefinition();

  const items = useMemo(() => {
    const { primitiveValueProps = {} } = getDefinition(widget) || {};

    return Object.entries(primitiveValueProps).sort(([key1], [key2]) =>
      key1.localeCompare(key2)
    );
  }, [widget, getDefinition]);

  return (
    <List ref={ref}>
      {items.map<ReactNode>(([path, { type, definition, required }]) => {
        const { [path]: primitive } = props;
        const { [type]: render } = PRIMITIVE_FIELDS;

        return (
          <ListItem key={path} onClick={(e) => e.stopPropagation()}>
            <ListItemIcon className={classes.icon} />

            <ListItemText
              disableTypography
              className={classes.row}
              primary={render(
                {
                  label: path,
                  required,
                  size: 'small',
                  value: primitive?.value,
                  variant: 'outlined',
                  onChange: (value: any) =>
                    onChange(config, path, {
                      type: 'PrimitiveValue',
                      value,
                    }),
                },
                definition as never
              )}
            />
          </ListItem>
        );
      })}
    </List>
  );
});

const FILTER_OPTIONS = createFilterOptions<{ label: string }>({
  limit: 20,
});

const PRIMITIVE_FIELDS: PrimitiveFields = {
  boolean: (defaultProps) => (
    <Core.SwitchField
      {...defaultProps}
      adornment={<SwipeIcon color="disabled" />}
    />
  ),
  icon: (defaultProps) => (
    <Autocomplete
      disablePortal
      fullWidth
      filterOptions={FILTER_OPTIONS}
      renderInput={(params) => <TextField {...params} {...defaultProps} />}
      options={Object.keys(Core.FaIcon).map((label) => ({
        label,
      }))}
      renderOption={(props, { label }) => (
        <MneuItem {...props}>
          <ListItemIcon>
            <Core.Icon code={label as Core.IconCode} />
          </ListItemIcon>

          <ListItemText primary={label} />
        </MneuItem>
      )}
    />
  ),
  number: (defaultProps) => (
    <Core.NumericField
      {...defaultProps}
      adornmentPosition="start"
      adornment={<DialpadIcon color="disabled" />}
    />
  ),
  oneof: (defaultProps, definition) =>
    !Array.isArray(definition) ? null : (
      <Core.SingleSelectField
        {...defaultProps}
        adornment={<MenuOpenIcon color="disabled" />}
        records={definition.map((value) => ({ value }))}
        optionProps={{
          propMapping: {
            primary: 'value',
            value: 'value',
          },
        }}
      />
    ),
  string: (defaultProps, definition) =>
    definition?.multiple ? (
      <Core.TextAreaField
        {...defaultProps}
        maxRows={3}
        minRows={3}
        adornmentPosition="start"
        adornment={<TextFieldsIcon color="disabled" />}
      />
    ) : (
      <Core.TextField
        {...defaultProps}
        adornmentPosition="start"
        adornment={<TextFieldsIcon color="disabled" />}
      />
    ),
};
