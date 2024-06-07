import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { forwardRef, useMemo, type ReactNode } from 'react';
import { useTranslation } from 'next-i18next';
import type { PrimitiveValueProp } from '@weavcraft/common';

import { PrimitiveFields } from '~web/components';
import { usePropsDefinition } from '~web/contexts';
import type { PropsSettingProps } from './PropsSettingTabs.types';

export default forwardRef<
  HTMLUListElement,
  PropsSettingProps<PrimitiveValueProp>
>(function PrimitiveList({ classes, config, onChange }, ref) {
  const { widget, props = {} } = config;
  const { t } = useTranslation();
  const { getDefinition } = usePropsDefinition();

  const items = useMemo(() => {
    const { primitiveValueProps = {} } = getDefinition(widget);

    return Object.entries(primitiveValueProps).sort(([key1], [key2]) =>
      key1.localeCompare(key2)
    );
  }, [widget, getDefinition]);

  return (
    <List disablePadding ref={ref}>
      <ListItem>
        <ListItemText
          primary={t('widgets:msg-primitive-description')}
          primaryTypographyProps={{
            variant: 'caption',
            color: 'text.secondary',
            whiteSpace: 'pre-line',
          }}
        />
      </ListItem>

      {items.map<ReactNode>(([path, { type, definition, required }]) => {
        const { [path]: primitive } = props;
        const { [type]: render } = PrimitiveFields;

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
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
