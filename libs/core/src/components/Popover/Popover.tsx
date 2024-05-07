import MuiPopover, { type PopoverOrigin } from '@mui/material/Popover';
import cx from 'clsx';
import { useId, useMemo, useState } from 'react';
import type { JsonObject } from 'type-fest';

import { useGenerateProps } from '../../hooks';

import type { AnchorOrigin, PopoverProps } from './Popover.types';

export default function Popover<D extends JsonObject>(props: PopoverProps<D>) {
  const [
    GeneratePropsProvider,
    { anchorPosition = 'bottom-center', toggle, ...popoverProps },
  ] = useGenerateProps<D, PopoverProps<D>>(props);

  const { type: Toggle, props: toggleProps } = toggle || {};
  const [open, setOpen] = useState(false);
  const id = useId();

  const [vertical, horizontal] = anchorPosition.split('-') as [
    AnchorOrigin<'vertical'>,
    AnchorOrigin<'horizontal'>
  ];

  const transformOrigin = useMemo<PopoverOrigin>(
    () => ({
      vertical:
        vertical === 'top'
          ? 'bottom'
          : vertical === 'bottom'
          ? 'top'
          : 'center',
      horizontal:
        horizontal === 'left'
          ? 'right'
          : horizontal === 'right'
          ? 'left'
          : 'center',
    }),
    [vertical, horizontal]
  );

  return (
    <GeneratePropsProvider>
      {Toggle && (
        <Toggle
          {...toggleProps}
          data-testid="PopoverToggle"
          id={id}
          className={cx(
            `PopoverAnchor-${vertical}-${horizontal}`,
            toggleProps?.className
          )}
          onClick={(...e: any[]) => {
            setOpen(true);
            toggleProps?.onClick?.(...e);
          }}
        />
      )}

      <MuiPopover
        {...popoverProps}
        anchorEl={() => document.getElementById(id)!}
        anchorOrigin={{ horizontal, vertical }}
        transformOrigin={transformOrigin}
        open={open}
        onClose={() => setOpen(false)}
        slotProps={{
          paper: {
            'data-testid': 'Popover',
            className: `PopoverTransform-${transformOrigin.vertical}-${transformOrigin.horizontal}`,
          } as never,
        }}
      />
    </GeneratePropsProvider>
  );
}
