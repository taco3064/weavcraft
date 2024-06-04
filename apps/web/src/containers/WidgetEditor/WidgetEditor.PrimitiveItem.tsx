import Core from '@weavcraft/core';
import DialpadIcon from '@mui/icons-material/Dialpad';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import SwipeIcon from '@mui/icons-material/Swipe';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import type { ReactNode } from 'react';

import { useSettingStyles } from './WidgetEditor.styles';
import type { PrimitiveItemProps } from './WidgetEditor.types';
import type { RenderConfig } from '~web/hooks';

export default function PrimitiveItem({
  classes,
  config,
  path,
  proptypes,
  value,
  onChange,
}: PrimitiveItemProps) {
  const {
    classes: { row: rowClassName },
  } = useSettingStyles();

  const baseProps = {
    label: path,
    required: proptypes.required,
    size: 'small' as const,
    value,
    variant: 'outlined' as const,
    onChange: (value: any) =>
      onChange(config as RenderConfig, path, {
        type: 'PrimitiveValue',
        value,
      }),
  };

  let input: ReactNode = null;

  switch (proptypes.type) {
    case 'boolean': {
      input = (
        <Core.SwitchField
          {...baseProps}
          adornment={<SwipeIcon color="disabled" />}
        />
      );

      break;
    }
    case 'number': {
      input = (
        <Core.NumericField
          {...baseProps}
          adornmentPosition="start"
          adornment={<DialpadIcon color="disabled" />}
        />
      );

      break;
    }
    case 'string': {
      const { definition } = proptypes;

      input = definition?.multiple ? (
        <Core.TextAreaField
          {...baseProps}
          maxRows={3}
          minRows={3}
          adornmentPosition="start"
          adornment={<TextFieldsIcon color="disabled" />}
        />
      ) : (
        <Core.TextField
          {...baseProps}
          adornmentPosition="start"
          adornment={<TextFieldsIcon color="disabled" />}
        />
      );

      break;
    }
    case 'oneof': {
      input = !Array.isArray(proptypes.definition) ? null : (
        <Core.SingleSelectField
          {...baseProps}
          adornment={<MenuOpenIcon color="disabled" />}
          records={proptypes.definition.map((value) => ({ value }))}
          optionProps={{
            propMapping: {
              primary: 'value',
              value: 'value',
            },
          }}
        />
      );

      break;
    }
    default:
      input = 'Primitive Value';
  }

  return (
    <ListItem onClick={(e) => e.stopPropagation()}>
      <ListItemIcon className={classes.icon} />

      <ListItemText
        disableTypography
        className={rowClassName}
        primary={input}
      />
    </ListItem>
  );
}
