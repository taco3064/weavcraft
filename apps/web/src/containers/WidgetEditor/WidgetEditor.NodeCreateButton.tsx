import Core from '@weavcraft/core';
import GlobalStyles from '@mui/material/GlobalStyles';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { useState, useTransition } from 'react';
import { useTranslation } from 'next-i18next';

import { MenuDialog } from '~web/components';
import { useNodeCreate } from './WidgetEditor.hooks';
import { useNodeCreateButtonStyles } from './WidgetEditor.styles';
import type { NodeCreateButtonProps } from './WidgetEditor.types';
import type { WidgetType } from '~web/services';

const CLASS_NAME = 'NodeCreateButton-root';

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
  const { classes, cx } = useNodeCreateButtonStyles();

  const { subtitle, tooltip, items } = useNodeCreate({
    path,
    variant,
    widgetId,
  });

  return (
    <>
      {GLOBAL_STYLES}

      <Tooltip title={tooltip}>
        <IconButton
          className={cx(classes.toggle, CLASS_NAME)}
          onClick={() => setOpen(true)}
        >
          <Core.Icon code="faAdd" />
        </IconButton>
      </Tooltip>

      <MenuDialog
        {...{ items, open, subtitle }}
        title={t('widgets:ttl-select-widget')}
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
      />
    </>
  );
}
