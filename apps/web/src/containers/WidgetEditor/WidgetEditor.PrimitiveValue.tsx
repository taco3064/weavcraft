import Core from '@weavcraft/core';
import DialpadIcon from '@mui/icons-material/Dialpad';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import SwipeIcon from '@mui/icons-material/Swipe';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import { useTranslation } from 'next-i18next';
import type { ReactNode } from 'react';

import { EditorList } from '~web/components';
import { usePrimitiveValueStyles } from './WidgetEditor.styles';
import type { PrimitiveValueProps } from './WidgetEditor.types';
import type { RenderConfig } from '~web/hooks';

import {
  usePathDescription,
  usePrimitiveItemsRender,
} from './WidgetEditor.hooks';

export default function PrimitiveValue({
  config,
  paths,
  onChange,
  onClose,
}: PrimitiveValueProps) {
  const description = usePathDescription(paths);

  const { t } = useTranslation();
  const { classes } = usePrimitiveValueStyles();
  const { row: rowClassName } = classes;

  const renderItems = usePrimitiveItemsRender(
    ({ classes, proptypes, primitivePath, value }) => {
      let input: ReactNode = null;

      const baseProps = {
        label: primitivePath,
        required: proptypes.required,
        size: 'small' as const,
        value,
        variant: 'outlined' as const,
        onChange: (value: unknown) =>
          onChange(config as RenderConfig, primitivePath, value),
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
        <ListItem key={primitivePath} onClick={(e) => e.stopPropagation()}>
          <ListItemIcon className={classes.icon} />

          <ListItemText
            disableTypography
            className={rowClassName}
            primary={input}
          />
        </ListItem>
      );
    },
    config
  );

  return !config ? null : (
    <EditorList
      {...{ description, onClose }}
      title={t('widgets:ttl-primitive-value', { widget: config.widget })}
      render={renderItems}
    />
  );
}
