import * as WeavcraftCore from '@weavcraft/core';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import _set from 'lodash/set';
import { Trans, useTranslation } from 'next-i18next';
import { useState, useTransition } from 'react';
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
  config,
  definition,
  path,
  onAppend,
}: AppendNodeProps) {
  const [, startTransition] = useTransition();
  const [open, setOpen] = useState(false);

  const { clickable = false, multiple = false } = definition || {};
  const { t } = useTranslation();
  const { classes } = useAppendNodeStyles();

  return (
    <>
      {!definition ? null : !clickable ? (
        <Button
          fullWidth
          size="large"
          variant="text"
          className={classes.node}
          startIcon={<Core.Icon code="faAdd" />}
          onClick={() => setOpen(true)}
        >
          <Trans i18nKey="widgets:btn-add-widget" />
        </Button>
      ) : (
        <Tooltip title={t('widgets:btn-add-trigger')}>
          <IconButton color="primary" className={classes.action}>
            <Core.Icon code="faAdd" />
          </IconButton>
        </Tooltip>
      )}

      <MenuDialog
        title={t('widgets:ttl-select-widget')}
        open={open}
        onClose={() => setOpen(false)}
        onItemClick={(e) =>
          startTransition(() => {
            const type = e.replace(/^widgets:lbl-widgets\./, '') as WidgetType;

            _set(config, 'widget', type);
            setOpen(false);
            onAppend({ type, path, multiple });
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
