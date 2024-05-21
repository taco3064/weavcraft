import * as WeavcraftCore from '@weavcraft/core';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import { useState, useTransition } from 'react';
import { useTranslation } from 'next-i18next';
import type CoreType from '@weavcraft/core';

import { MenuDialog } from '~web/components';
import { useAppendNodeStyles } from './WidgetEditor.styles';
import type { AppendNodeProps } from './WidgetEditor.types';
import type { WidgetType } from '~web/services';

const { default: Core, ...CATEGORIES } = WeavcraftCore;

const TOGGLE_CLASS_NAME = 'AppendNode-toggle';

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
  const { classes, cx } = useAppendNodeStyles({
    toggleClassName: TOGGLE_CLASS_NAME,
  });

  const label = [widgetId && t(`widgets:lbl-widgets.${widgetId}`), path]
    .filter(Boolean)
    .join(' - ');

  return (
    <>
      <Toolbar disableGutters variant="dense" className={classes.root}>
        <Tooltip
          title={`${t(
            `widgets:btn-add-${variant === 'action' ? 'trigger' : 'widget'}`
          )}${!label ? '' : ` (${label})`}`}
        >
          <IconButton
            className={cx(classes.toggle, TOGGLE_CLASS_NAME)}
            onClick={() => setOpen(true)}
          >
            <Core.Icon code="faAdd" />
          </IconButton>
        </Tooltip>
      </Toolbar>

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
        items={Object.entries(CATEGORIES).map(([category, widgets]) => ({
          icon: ICON[category as keyof typeof ICON],
          label: `widgets:lbl-category.${category}`,
          items: Object.keys(widgets).map((widgetId) => ({
            label: `widgets:lbl-widgets.${widgetId}`,
          })),
        }))}
      />
    </>
  );
}
