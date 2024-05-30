import * as WeavcraftCore from '@weavcraft/core';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import _get from 'lodash/get';
import { useState, useTransition } from 'react';
import { useTranslation } from 'next-i18next';
import type CoreType from '@weavcraft/core';

import { MenuDialog } from '~web/components';
import { useAppendNodeStyles } from './WidgetEditor.styles';
import { usePropsDefinition } from '~web/contexts';
import type { AppendNodeProps } from './WidgetEditor.types';
import type { MenuItemOptions } from '~web/hooks';
import type { WidgetType } from '~web/services';

const { default: Core, ...CATEGORIES } = WeavcraftCore;

const ICON: Record<keyof typeof CATEGORIES, CoreType.IconCode> = {
  Display: 'faTableList',
  Input: 'faPenToSquare',
  Interaction: 'faClapperboard',
  Layout: 'faBorderNone',
};

export default function AppendNode({
  path,
  variant,
  widgetId,
  onAppend,
}: AppendNodeProps) {
  const [, startTransition] = useTransition();
  const [open, setOpen] = useState(false);

  const { t } = useTranslation();
  const { getDefinition } = usePropsDefinition();
  const { classes } = useAppendNodeStyles();

  const label = [widgetId && t(`widgets:lbl-widgets.${widgetId}`), path]
    .filter(Boolean)
    .join(' - ');

  return (
    <>
      <Tooltip
        title={
          <>
            {t(
              `widgets:btn-add-${variant === 'action' ? 'trigger' : 'widget'}`
            )}
            {!label ? '' : ` (${label})`}
          </>
        }
      >
        <IconButton className={classes.toggle} onClick={() => setOpen(true)}>
          <Core.Icon code="faAdd" />
        </IconButton>
      </Tooltip>

      <MenuDialog
        title={t('widgets:ttl-select-widget')}
        subtitle={label}
        open={open}
        onClose={() => setOpen(false)}
        onItemClick={(e) =>
          startTransition(() => {
            const widget = e.replace(
              /^widgets:lbl-widgets\./,
              ''
            ) as WidgetType;

            setOpen(false);
            onAppend(widget);
          })
        }
        items={Object.entries(CATEGORIES).reduce<MenuItemOptions[]>(
          (acc, [category, widgets]) => {
            const items = (Object.keys(widgets) as WidgetType[]).reduce<
              MenuItemOptions[]
            >((result, widgetId) => {
              const definition = getDefinition(widgetId);

              if (
                variant !== 'action' ||
                _get(definition, 'eventCallbackProps.onClick.type') ===
                  'function'
              ) {
                result.push({
                  label: `widgets:lbl-widgets.${widgetId}`,
                });
              }

              return result;
            }, []);

            if (items.length) {
              acc.push({
                icon: ICON[category as keyof typeof ICON],
                label: `widgets:lbl-category.${category}`,
                items,
              });
            }

            return acc;
          },
          []
        )}
      />
    </>
  );
}
