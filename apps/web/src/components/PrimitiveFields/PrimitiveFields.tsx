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

import type { AdornmentIcons, PrimitiveFields } from './PrimitiveFields.types';

const filterOptions = createFilterOptions<{ label: string }>({
  limit: 20,
});

export const PrimitiveIcons: AdornmentIcons = {
  boolean: <SwipeIcon color="disabled" />,
  icon: <EmojiSymbolsIcon color="disabled" />,
  number: <DialpadIcon color="disabled" />,
  oneof: <MenuOpenIcon color="disabled" />,
  string: <TextFieldsIcon color="disabled" />,
};

const Primitive: PrimitiveFields = {
  boolean: (defaultProps) => (
    <Core.SwitchField {...defaultProps} adornment={PrimitiveIcons.boolean} />
  ),
  icon: ({ value, onChange, ...defaultProps }) => (
    <Autocomplete
      {...{ filterOptions, value }}
      disablePortal
      fullWidth
      onChange={(_e, value) => onChange?.(value?.label)}
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
      renderInput={(params) => (
        <TextField
          {...params}
          {...defaultProps}
          margin="none"
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
  ),
  number: (defaultProps) => (
    <Core.NumericField
      {...defaultProps}
      adornmentPosition="start"
      adornment={PrimitiveIcons.number}
    />
  ),
  oneof: (defaultProps, definition) =>
    !Array.isArray(definition) ? null : (
      <Core.SingleSelectField
        {...defaultProps}
        adornment={PrimitiveIcons.oneof}
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
        adornment={PrimitiveIcons.string}
      />
    ) : (
      <Core.TextField
        {...defaultProps}
        adornmentPosition="start"
        adornment={PrimitiveIcons.string}
      />
    ),
};

export default Primitive;
