import Core from '@weavcraft/core';
import GlobalStyles from '@mui/material/GlobalStyles';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { nanoid } from 'nanoid';
import { useCallback, useState, useTransition } from 'react';
import { useTranslation } from 'next-i18next';

import { MenuDialog } from '~web/components';
import { useNodeCreateButtonStyles } from './WidgetEditor.styles';
import { useNodeCreateInfo } from './WidgetEditor.hooks';
import type { NodeCreateButtonProps } from './WidgetEditor.types';
import type { WidgetType } from '~web/services';

const CLASS_NAME = `NodeCreateButton-${nanoid(4)}`;

const GLOBAL_STYLES = (
  <GlobalStyles
    styles={(theme) => ({
      [`*:has(> .${CLASS_NAME})`]: {
        border: `1px dashed ${theme.palette.divider}`,
        borderRadius: theme.spacing(0.5),

        [`&:has(> .${CLASS_NAME}:hover)`]: {
          background: theme.palette.action.hover,
          filter: 'brightness(1.2)',
        },
      },
    })}
  />
);

export default function NodeCreateButton({
  onClick,
  ...props
}: NodeCreateButtonProps) {
  const [, startTransition] = useTransition();
  const [visible, setVisible] = useState(true);
  const [open, setOpen] = useState(false);

  const { t } = useTranslation();
  const { classes, cx } = useNodeCreateButtonStyles();
  const { subtitle, tooltip, items } = useNodeCreateInfo(props);

  const buttonRef = useCallback((el: HTMLButtonElement | null) => {
    /**
     * * If the parent element of the Button has an id,
     * * it indicates that it is rendered through the createPortal method from @weavcraft/core,
     * * hence the create button does not need to be displayed.
     */
    setVisible(!el?.parentElement?.hasAttribute('id'));
  }, []);

  return (
    <>
      {GLOBAL_STYLES}

      <Tooltip title={tooltip}>
        <IconButton
          className={cx(classes.toggle, CLASS_NAME)}
          ref={buttonRef}
          size="small"
          sx={{ display: visible ? null : 'none' }}
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
