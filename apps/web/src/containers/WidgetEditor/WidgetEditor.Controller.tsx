import Core from '@weavcraft/core';
import IconButton from '@mui/material/IconButton';
import Popover from '@mui/material/Popover';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { Trans, useTranslation } from 'next-i18next';
import { useState, useTransition } from 'react';

import { ConfirmToggle } from '~web/components';
import { useControllerStyles } from './WidgetEditor.styles';
import type { ControllerProps } from './WidgetEditor.types';

const TOGGLE_CLASS_NAME = 'Controller-toggle';

export default function Controller({
  children,
  config,
  onDelete,
  onEdit,
}: ControllerProps) {
  const [, startTransition] = useTransition();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement>();

  const { widget: widgetId } = config;
  const { t } = useTranslation();
  const { classes, cx } = useControllerStyles({
    toggleClassName: TOGGLE_CLASS_NAME,
  });

  return (
    <>
      <Toolbar disableGutters className={classes.root}>
        {children}

        <Tooltip
          title={t('widgets:btn-open-toolbar', {
            widget: t(`widgets:lbl-widgets.${widgetId}`),
          })}
        >
          <IconButton
            className={cx(classes.toggle, TOGGLE_CLASS_NAME)}
            sx={{ opacity: anchorEl ? 0.4 : 1 }}
            onClick={(e) => setAnchorEl(e.currentTarget)}
          >
            <Core.Icon code="faEllipsisVertical" />
          </IconButton>
        </Tooltip>
      </Toolbar>

      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'center', horizontal: 'left' }}
        slotProps={{ paper: { className: classes.toolbar } }}
        transformOrigin={{ vertical: 'center', horizontal: 'right' }}
        onClose={() => setAnchorEl(undefined)}
      >
        <Toolbar variant="dense">
          <Typography variant="subtitle1" color="secondary" fontWeight="bolder">
            <Trans i18nKey={`widgets:lbl-widgets.${widgetId}`} />
          </Typography>

          <Tooltip title={t('widgets:btn-edit-widget')}>
            <IconButton
              color="primary"
              onClick={() =>
                startTransition(() => {
                  onEdit();
                  setAnchorEl(undefined);
                })
              }
            >
              <Core.Icon code="faGear" />
            </IconButton>
          </Tooltip>

          <ConfirmToggle
            subject={t('ttl-delete-confirm')}
            onConfirm={() =>
              startTransition(() => {
                onDelete();
                setAnchorEl(undefined);
              })
            }
            message={t('widgets:msg-delete-widget-confirm', {
              widget: t(`widgets:lbl-widgets.${widgetId}`),
            })}
            toggle={
              <Tooltip title={t('widgets:btn-delete-widget')}>
                <IconButton color="error">
                  <Core.Icon code="faTrash" />
                </IconButton>
              </Tooltip>
            }
          />
        </Toolbar>
      </Popover>
    </>
  );
}
