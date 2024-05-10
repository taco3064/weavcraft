import MuiDrawer from '@mui/material/Drawer';
import MuiIconButton from '@mui/material/IconButton';
import MuiToolbar from '@mui/material/Toolbar';
import MuiTypography from '@mui/material/Typography';
import { ClickAwayListener } from '@mui/base/ClickAwayListener';
import { useState } from 'react';
import type { JsonObject } from 'type-fest';

import Icon from '../Icon';
import Toolbar from '../Toolbar';
import { WidgetWrapper } from '../../styles';
import { useDrawerStyles } from './Drawer.styles';
import { useGenerateProps } from '../../hooks';

import type { AnchorOptions, DrawerProps } from './Drawer.types';

//* Variables
const ANCHOR_OPTIONS: AnchorOptions = {
  left: {
    closeIcon: 'faAngleLeft',
    direction: 'row',
  },
  right: {
    closeIcon: 'faAngleRight',
    direction: 'row-reverse',
  },
};

//* Components
export default function Drawer<D extends JsonObject>(props: DrawerProps<D>) {
  const [open, setOpen] = useState(false);

  const [
    GeneratePropsProvider,
    {
      anchor = 'left',
      breakpoint = 'sm',
      children,
      content,
      elevation,
      height = '100vh',
      title,
      toggleIcon = 'faBars',
      width = 320,
      ...headerProps
    },
  ] = useGenerateProps<D, DrawerProps<D>>(props);

  const { classes } = useDrawerStyles({ breakpoint, open, height, width });
  const { closeIcon, direction } = ANCHOR_OPTIONS[anchor];

  const toggle = open ? null : (
    <MuiIconButton
      data-testid="DrawerToggle"
      color="inherit"
      className={classes.toggle}
      onClick={() => setOpen(true)}
    >
      <Icon className="Drawer-toggle" code={toggleIcon} />

      {headerProps.headerIcon && (
        <Icon className="Drawer-icon" code={headerProps.headerIcon} />
      )}
    </MuiIconButton>
  );

  return (
    <GeneratePropsProvider>
      <WidgetWrapper
        data-testid="DrawerContainer"
        direction={direction}
        maxWidth={false}
        sx={{ position: 'relative' }}
        header={
          <MuiDrawer
            {...{ anchor, open }}
            data-testid="Drawer"
            variant="persistent"
            PaperProps={{ elevation, className: classes.paper }}
          >
            {open && (
              <ClickAwayListener onClickAway={() => setOpen(false)}>
                <WidgetWrapper
                  data-testid="DrawerContent"
                  direction="column"
                  maxWidth={false}
                  header={
                    <MuiToolbar
                      data-testid="DrawerHeader"
                      variant={headerProps.headerVariant}
                      style={{
                        display: 'flex',
                        flexDirection: direction,
                        gap: 8,
                      }}
                    >
                      {title && (
                        <MuiTypography variant="h6">{title}</MuiTypography>
                      )}

                      <MuiIconButton
                        data-testid="DrawerClose"
                        onClick={() => setOpen(false)}
                        {...(anchor === 'left' && {
                          style: { marginLeft: 'auto' },
                        })}
                      >
                        <Icon code={closeIcon} />
                      </MuiIconButton>
                    </MuiToolbar>
                  }
                >
                  {content}
                </WidgetWrapper>
              </ClickAwayListener>
            )}
          </MuiDrawer>
        }
      >
        <WidgetWrapper
          data-testid="Content"
          direction="column"
          className={classes.content}
          height="100%"
          maxWidth={false}
          header={
            <Toolbar
              color={headerProps.headerColor}
              elevation={headerProps.headerElevation}
              icon={anchor === 'left' ? toggle : null}
              title={headerProps.headerTitle}
              variant={headerProps.headerVariant}
            >
              <MuiToolbar
                disableGutters
                data-testid="ContentHeader"
                variant="dense"
                style={{ gap: 8, marginLeft: 'auto' }}
              >
                {headerProps.header}
                {anchor === 'right' ? toggle : null}
              </MuiToolbar>
            </Toolbar>
          }
        >
          {children}
        </WidgetWrapper>
      </WidgetWrapper>
    </GeneratePropsProvider>
  );
}
