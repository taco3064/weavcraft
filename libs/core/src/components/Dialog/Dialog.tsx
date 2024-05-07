import MuiButton from '@mui/material/Button';
import MuiDialog from '@mui/material/Dialog';
import MuiDialogActions from '@mui/material/DialogActions';
import MuiDialogContent from '@mui/material/DialogContent';
import MuiDialogTitle from '@mui/material/DialogTitle';
import MuiIconButton from '@mui/material/IconButton';
import MuiSlide from '@mui/material/Slide';
import { forwardRef, useState, type ReactElement } from 'react';
import type { JsonObject } from 'type-fest';
import type { TransitionProps } from '@mui/material/transitions';

import Icon from '../Icon';
import { useGenerateProps } from '../../hooks';
import type { DialogProps } from './Dialog.types';

const Transition = forwardRef<
  unknown,
  TransitionProps & { children: ReactElement<any, any> }
>(function Transition(props, ref) {
  return <MuiSlide direction="up" ref={ref} {...props} />;
});

export default function Dialog<D extends JsonObject>(props: DialogProps<D>) {
  const [
    GeneratePropsProvider,
    { actions, children, icon, title, toggle, onActionClick, ...dialogProps },
  ] = useGenerateProps<D, DialogProps<D>>(props);

  const { type: Toggle, props: toggleProps } = toggle || {};
  const [open, setOpen] = useState(false);

  return (
    <GeneratePropsProvider>
      {Toggle && (
        <Toggle
          {...toggleProps}
          data-testid="DialogToggle"
          onClick={(...e: any[]) => {
            setOpen(true);
            toggleProps?.onClick?.(...e);
          }}
        />
      )}

      <MuiDialog
        {...dialogProps}
        TransitionComponent={Transition}
        data-testid="Dialog"
        open={open}
      >
        <MuiDialogTitle display="flex" gap={8} data-testid="DialogTitle">
          {icon && <Icon code={icon} />}
          {title}

          <MuiIconButton
            data-testid="DialogCloseButton"
            sx={{ marginLeft: 'auto' }}
            onClick={() => setOpen(false)}
          >
            <Icon code="faClose" />
          </MuiIconButton>
        </MuiDialogTitle>

        <MuiDialogContent data-testid="DialogContent">
          {children}
        </MuiDialogContent>

        {!actions?.length ? null : (
          <MuiDialogActions data-testid="DialogActions">
            {actions.map(({ text, icon, color }, i) => (
              <MuiButton
                key={i}
                color={color}
                startIcon={icon && <Icon code={icon} />}
                data-testid={`DialogAction_${i}`}
                onClick={() => {
                  setOpen(false);
                  onActionClick?.(text || i);
                }}
              >
                {text || `Text ${i}`}
              </MuiButton>
            ))}
          </MuiDialogActions>
        )}
      </MuiDialog>
    </GeneratePropsProvider>
  );
}
