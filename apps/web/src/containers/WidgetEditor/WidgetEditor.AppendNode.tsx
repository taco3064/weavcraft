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
  onAppend,
}: AppendNodeProps) {
  const [, startTransition] = useTransition();
  const [open, setOpen] = useState(false);

  const { t } = useTranslation();
  const { classes } = useAppendNodeStyles();

  return (
    <>
      {variant === 'action' ? (
        <Tooltip
          title={`${t('widgets:btn-add-trigger')}${!path ? '' : ` (${path})`}`}
        >
          <IconButton color="primary" className={classes.action}>
            <Core.Icon code="faAdd" />
          </IconButton>
        </Tooltip>
      ) : (
        <Button
          fullWidth
          size="large"
          variant="text"
          className={classes.node}
          startIcon={<Core.Icon code="faAdd" />}
          sx={{ textTransform: 'capitalize' }}
          onClick={() => setOpen(true)}
        >
          {`${t('widgets:btn-add-widget')}${!path ? '' : ` (${path})`}`}
        </Button>
      )}

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
