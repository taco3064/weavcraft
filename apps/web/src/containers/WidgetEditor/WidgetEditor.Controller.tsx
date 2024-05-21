import Core from '@weavcraft/core';
import IconButton from '@mui/material/IconButton';
import Popper from '@mui/material/Popper';
import Popover from '@mui/material/Popover';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { Trans, useTranslation } from 'next-i18next';
import { useId, useState, useTransition, type ComponentType } from 'react';

import { ConfirmToggle } from '~web/components';
import { useControllerStyles } from './WidgetEditor.styles';
import type { ControllerProps } from './WidgetEditor.types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Controller<W extends ComponentType<any>>({
  'widget.editor.controller.props': {
    WidgetEl,
    config,
    hideToggle = false,
    onDelete,
    onEdit,
  },
  ...props
}: ControllerProps<W>) {
  const standardId = useId();
  const widget = <WidgetEl {...props} />;

  const [, startTransition] = useTransition();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement>();

  const { widget: widgetId } = config;
  const { t } = useTranslation();
  const { classes } = useControllerStyles({ expanded: Boolean(anchorEl) });

  return (
    <>
      <div id={standardId} className={classes.standard} />
      {widget}

      <Popper
        open={!hideToggle}
        placement="right"
        anchorEl={() =>
          global.document?.getElementById(standardId)
            ?.nextElementSibling as Element
        }
      >
        <Tooltip
          title={t('widgets:btn-open-toolbar', {
            widget: t(`widgets:lbl-widgets.${widgetId}`),
          })}
        >
          <IconButton
            size="small"
            className={classes.toggle}
            onClick={(e) => setAnchorEl(e.currentTarget)}
          >
            <Core.Icon code="faEllipsisVertical" />
          </IconButton>
        </Tooltip>
      </Popper>

      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'center', horizontal: 'right' }}
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
