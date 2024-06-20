import Core from '@weavcraft/core';
import GlobalStyles from '@mui/material/GlobalStyles';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { nanoid } from 'nanoid';
import { useCallback, useMemo, useState, useTransition } from 'react';
import { useTranslation } from 'next-i18next';

import { MenuDialog } from '~web/components';
import { useNodeCreateButtonStyles } from './WidgetEditor.styles';
import { useWidgetOptions } from './WidgetEditor.hooks';
import type { NodeCreateButtonProps } from './WidgetEditor.types';
import type { WidgetType } from '../imports.types';

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
  config,
  path,
  variant,
  onClick,
}: NodeCreateButtonProps) {
  const options = useWidgetOptions(variant);

  const [, startTransition] = useTransition();
  const [visible, setVisible] = useState(true);
  const [open, setOpen] = useState(false);

  const { widget } = config || {};
  const { t } = useTranslation();
  const { classes, cx } = useNodeCreateButtonStyles();

  const { subtitle, tooltip } = useMemo(() => {
    const subtitle = [widget && t(`widgets:lbl-widgets.${widget}`), path]
      .filter(Boolean)
      .join(' - ');

    return {
      subtitle,
      tooltip: [
        t(`widgets:btn-add.${variant === 'action' ? 'trigger' : 'widget'}`),
        !subtitle ? '' : ` (${subtitle})`,
      ].join(' '),
    };
  }, [widget, path, variant, t]);

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
        {...{ open, subtitle }}
        items={options}
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
