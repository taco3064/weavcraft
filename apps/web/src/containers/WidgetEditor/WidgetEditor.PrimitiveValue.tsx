import Core from '@weavcraft/core';
import DialpadIcon from '@mui/icons-material/Dialpad';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import SwipeIcon from '@mui/icons-material/Swipe';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import { useTranslation } from 'next-i18next';

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
    ({ classes, proptypes, primitivePath, value }) => (
      <ListItem key={primitivePath} onClick={(e) => e.stopPropagation()}>
        <ListItemIcon className={classes.icon} />

        <ListItemText
          disableTypography
          className={rowClassName}
          primary={(() => {
            const baseProps = {
              variant: 'outlined' as const,
              size: 'small' as const,
              required: proptypes.required,
              label: primitivePath,
              value,
              onChange: (value: unknown) =>
                onChange(config as RenderConfig, primitivePath, value),
            };

            switch (proptypes.type) {
              case 'boolean':
                return (
                  <Core.SwitchField
                    {...baseProps}
                    adornment={<SwipeIcon color="disabled" />}
                  />
                );

              case 'number':
                return (
                  <Core.NumericField
                    {...baseProps}
                    adornmentPosition="end"
                    adornment={<DialpadIcon color="disabled" />}
                  />
                );

              case 'string':
                return (
                  <Core.TextField
                    {...baseProps}
                    adornmentPosition="end"
                    adornment={<TextFieldsIcon color="disabled" />}
                  />
                );

              case 'oneof':
                return !Array.isArray(proptypes.definition) ? null : (
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

              default:
                return 'Primitive Value';
            }
          })()}
        />
      </ListItem>
    ),
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
