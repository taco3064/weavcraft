import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import Core from '@weavcraft/core';
import DialpadIcon from '@mui/icons-material/Dialpad';
import EmojiSymbolsIcon from '@mui/icons-material/EmojiSymbols';
import InputAdornment from '@mui/material/InputAdornment';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import MneuItem from '@mui/material/MenuItem';
import SwipeIcon from '@mui/icons-material/Swipe';
import TextField from '@mui/material/TextField';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import type { PrimitiveValueProp } from '@weavcraft/common';
import type { TypeDefinition } from '../imports.types';

import type {
  AdornmentIcons,
  PrimitiveFieldProps,
  PrimitiveType,
} from './PrimitiveField.types';

const filterOptions = createFilterOptions<Core.IconCode>({
  limit: 20,
});

export const PrimitiveIcons: AdornmentIcons = {
  boolean: <SwipeIcon color="disabled" />,
  icon: <EmojiSymbolsIcon color="disabled" />,
  number: <DialpadIcon color="disabled" />,
  oneof: <MenuOpenIcon color="disabled" />,
  string: <TextFieldsIcon color="disabled" />,
};

export default function PrimitiveField<T extends PrimitiveType>({
  definition: { type, required: defaultRequired, definition },
  required = defaultRequired,
  ...props
}: PrimitiveFieldProps<T>) {
  switch (type) {
    case 'boolean':
      return (
        <Core.SwitchField
          {...(props as PrimitiveFieldProps<'boolean'>)}
          adornment={PrimitiveIcons.boolean}
          required={required}
        />
      );

    case 'number':
      return (
        <Core.NumericField
          {...(props as PrimitiveFieldProps<'number'>)}
          adornmentPosition="start"
          adornment={PrimitiveIcons.number}
          required={required}
        />
      );

    case 'oneof': {
      const options = definition as NonNullable<PrimitiveValueProp['value']>[];

      return !Array.isArray(options) ? null : (
        <Core.SingleSelectField
          {...(props as PrimitiveFieldProps<'oneof'>)}
          adornment={PrimitiveIcons.oneof}
          records={options.map((value) => ({ value }))}
          required={required}
          optionProps={{
            propMapping: {
              primary: 'value',
              value: 'value',
            },
          }}
        />
      );
    }
    case 'string': {
      const { multiple } =
        (definition as TypeDefinition.String['definition']) || {};

      return !multiple ? (
        <Core.TextField
          {...(props as PrimitiveFieldProps<'string'>)}
          adornmentPosition="start"
          adornment={PrimitiveIcons.string}
          required={required}
        />
      ) : (
        <Core.TextAreaField
          {...(props as PrimitiveFieldProps<'string'>)}
          maxRows={3}
          minRows={3}
          adornmentPosition="start"
          adornment={PrimitiveIcons.string}
          required={required}
        />
      );
    }
    case 'icon': {
      const { value, onChange, ...renderProps } =
        props as PrimitiveFieldProps<'icon'>;

      return (
        <Autocomplete
          {...{ filterOptions, value }}
          disablePortal
          fullWidth
          onChange={(_e, value) => onChange?.(value || undefined)}
          options={Object.keys(Core.fontawesomes).map(
            (label) => label as Core.IconCode
          )}
          renderOption={(props, label) => (
            <MneuItem {...props}>
              <ListItemIcon>
                <Core.Icon code={label} />
              </ListItemIcon>

              <ListItemText primary={label} />
            </MneuItem>
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              {...renderProps}
              margin="none"
              required={required}
              InputProps={{
                ...params.InputProps,
                startAdornment: (
                  <InputAdornment
                    position="start"
                    sx={{ marginRight: 0, marginLeft: 1 }}
                  >
                    {PrimitiveIcons.icon}
                  </InputAdornment>
                ),
                sx: {
                  '& input': {
                    padding: 0,
                  },
                },
              }}
            />
          )}
        />
      );
    }

    default:
      return null;
  }
}
