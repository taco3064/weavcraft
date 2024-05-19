import * as WeavcraftCore from '@weavcraft/core';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { useState, useTransition } from 'react';
import { useTranslation } from 'next-i18next';
import type CoreType from '@weavcraft/core';

import { MenuDialog } from '~web/components';
import { useAppendNodeStyles } from './WidgetEditor.styles';
import type { AppendNodeProps } from './WidgetEditor.types';
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
  const { classes } = useAppendNodeStyles();

  const label = [widgetId && t(`widgets:lbl-widgets.${widgetId}`), path]
    .filter(Boolean)
    .join(' - ');

  return (
    <>
      <Tooltip
        title={`${t(
          `widgets:btn-add-${variant === 'action' ? 'trigger' : 'widget'}`
        )}${!label ? '' : ` (${label})`}`}
      >
        <IconButton
          color="primary"
          size="large"
          className={classes.action}
          onClick={() => setOpen(true)}
        >
          <Core.Icon code="faAdd" />
        </IconButton>
      </Tooltip>

      <MenuDialog
        title={t('widgets:ttl-select-widget')}
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
