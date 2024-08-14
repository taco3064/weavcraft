import GlobalStyles from '@mui/material/GlobalStyles';
import { useCallback, useMemo, useState, useTransition } from 'react';
import { useTranslation } from 'next-i18next';

import { AddIconButton, MenuDialog } from '~web/components';
import { useWidgetOptions } from './WidgetEditor.hooks';
import type { NodeCreateButtonProps } from './WidgetEditor.types';
import type { CoreComponent } from '../imports.types';

export default function NodeCreateButton({
  config,
  path,
  variant,
  onCreate,
}: NodeCreateButtonProps) {
  const options = useWidgetOptions(variant);

  const [, startTransition] = useTransition();
  const [visible, setVisible] = useState(true);
  const [open, setOpen] = useState(false);

  const { component } = config || {};
  const { t } = useTranslation();

  const { subtitle, tooltip } = useMemo(() => {
    const name = t(`widgets:lbl-component.${component}`);
    const subtitle = [component && name, path].filter(Boolean).join(' - ');

    return {
      subtitle,
      tooltip: [
        t(`widgets:btn-add.${variant === 'action' ? 'trigger' : 'component'}`),
        !subtitle ? '' : ` (${subtitle})`,
      ].join(' '),
    };
  }, [component, path, variant, t]);

  const buttonRef = useCallback(
    (el: HTMLButtonElement | null) =>
      /**
       * * If the parent element of the Button has an id,
       * * it indicates that it is rendered through the createPortal method from @weavcraft/core,
       * * hence the create button does not need to be displayed.
       */
      setVisible(!el?.parentElement?.hasAttribute('id')),
    []
  );

  return (
    <>
      {GLOBAL_STYLES}

      <AddIconButton
        ref={buttonRef}
        className={CLASS_NAME}
        sx={{ display: visible ? null : 'none' }}
        tooltip={tooltip}
        onClick={() => setOpen(true)}
      />

      <MenuDialog
        {...{ open, subtitle }}
        items={options}
        title={t('widgets:ttl-select-component')}
        onClose={() => setOpen(false)}
        onItemClick={(e) =>
          startTransition(() => {
            const component = e.replace(
              /^widgets:lbl-component\./,
              ''
            ) as CoreComponent;

            setOpen(false);
            onCreate(component);
          })
        }
      />
    </>
  );
}

const CLASS_NAME = 'WidgetEditorNodeCreateButton-root';

const GLOBAL_STYLES = (
  <GlobalStyles
    styles={(theme) => ({
      [`*:has(> .${CLASS_NAME})`]: {
        border: `2px dashed ${theme.palette.divider}`,
        borderRadius: theme.spacing(1),

        [`&:has(> .${CLASS_NAME}:hover)`]: {
          background: theme.palette.action.hover,
          filter: 'brightness(1.2)',
        },
      },
    })}
  />
);
