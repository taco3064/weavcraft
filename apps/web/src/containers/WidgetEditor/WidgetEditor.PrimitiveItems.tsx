/* eslint-disable @typescript-eslint/no-explicit-any */
import Core from '@weavcraft/core';
import DialpadIcon from '@mui/icons-material/Dialpad';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import SwipeIcon from '@mui/icons-material/Swipe';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import { useMemo, type ReactNode } from 'react';

import { usePropsDefinition } from '~web/contexts';
import { useSettingStyles } from './WidgetEditor.styles';
import type { PrimitiveItemsProps } from './WidgetEditor.types';
import type { RenderConfig } from '~web/hooks';

export default function PrimitiveItems({
  classes,
  config,
  onChange,
}: PrimitiveItemsProps) {
  const { widget, props = {} } = config || {};
  const { getDefinition } = usePropsDefinition();

  const {
    classes: { row: rowClassName },
  } = useSettingStyles();

  const primitiveProps = useMemo(() => {
    const { primitiveValueProps = {} } = getDefinition(widget) || {};

    return Object.entries(primitiveValueProps);
  }, [widget, getDefinition]);

  return primitiveProps.map<ReactNode>(([path, proptypes]) => {
    let input: ReactNode = null;
    const { [path]: primitive } = props;

    const baseProps = {
      label: path,
      required: proptypes.required,
      size: 'small' as const,
      value: primitive?.value as any,
      variant: 'outlined' as const,
      onChange: (value: any) =>
        onChange(config as RenderConfig, path, {
          type: 'PrimitiveValue',
          value,
        }),
    };

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
      <ListItem key={path} onClick={(e) => e.stopPropagation()}>
        <ListItemIcon className={classes.icon} />

        <ListItemText
          disableTypography
          className={rowClassName}
          primary={input}
        />
      </ListItem>
    );
  });
}
