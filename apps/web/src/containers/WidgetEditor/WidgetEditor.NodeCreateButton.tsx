import * as WeavcraftCore from '@weavcraft/core';
import GlobalStyles from '@mui/material/GlobalStyles';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import _get from 'lodash/get';
import { useState, useTransition } from 'react';
import { useTranslation } from 'next-i18next';
import type CoreType from '@weavcraft/core';

import { MenuDialog } from '~web/components';
import { useNodeCreateButtonStyles } from './WidgetEditor.styles';
import { usePropsDefinition } from '~web/contexts';
import type { MenuItemOptions } from '~web/hooks';
import type { NodeCreateButtonProps } from './WidgetEditor.types';
import type { WidgetType } from '~web/services';

const { default: Core, ...CATEGORIES } = WeavcraftCore;
const CLASS_NAME = 'NodeCreateButton-root';

const ICON: Record<keyof typeof CATEGORIES, CoreType.IconCode> = {
  Display: 'faTableList',
  Input: 'faPenToSquare',
  Interaction: 'faClapperboard',
  Layout: 'faBorderNone',
};

const GLOBAL_STYLES = (
  <GlobalStyles
    styles={(theme) => ({
      [`*:has(> .${CLASS_NAME})`]: {
        border: `1px dashed ${theme.palette.divider}`,
        borderRadius: theme.spacing(0.5),
      },
      [`*:has(> .${CLASS_NAME}:hover)`]: {
        background: theme.palette.background.paper,
      },
    })}
  />
);

export default function NodeCreateButton({
  path,
  variant,
  widgetId,
  onClick,
}: NodeCreateButtonProps) {
  const [, startTransition] = useTransition();
  const [open, setOpen] = useState(false);

  const { t } = useTranslation();
  const { getDefinition } = usePropsDefinition();
  const { classes, cx } = useNodeCreateButtonStyles();

  const label = [widgetId && t(`widgets:lbl-widgets.${widgetId}`), path]
    .filter(Boolean)
    .join(' - ');

  return (
    <>
      {GLOBAL_STYLES}

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
        <IconButton
          className={cx(classes.toggle, CLASS_NAME)}
          onClick={() => setOpen(true)}
        >
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
            onClick(widget);
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
                result.push({ label: `widgets:lbl-widgets.${widgetId}` });
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
