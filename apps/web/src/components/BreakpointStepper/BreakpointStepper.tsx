import AppBar from '@mui/material/AppBar';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';
import MobileStepper from '@mui/material/MobileStepper';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import { forwardRef } from 'react';
import { useTheme } from '@mui/material/styles';
import { useTranslation } from 'next-i18next';

import { useMainStyles } from './BreakpointStepper.styles';
import type { BreakpointStepperProps } from './BreakpointStepper.types';

export default forwardRef<HTMLElement, BreakpointStepperProps>(
  function BreakpointStepper(
    { AppBarProps, disableNextButton = false, value, onChange },
    ref
  ) {
    const { t } = useTranslation();
    const { classes } = useMainStyles();

    const theme = useTheme();
    const breakpoints = theme.breakpoints.keys;
    const activeStep = breakpoints.indexOf(value);

    return (
      <AppBar {...AppBarProps} ref={ref}>
        <Toolbar variant="dense">
          <MobileStepper
            position="static"
            variant="dots"
            className={classes.root}
            steps={breakpoints.length}
            activeStep={activeStep}
            backButton={
              <IconButton
                disabled={activeStep === 0}
                onClick={() => onChange(breakpoints[activeStep - 1])}
              >
                <Tooltip
                  title={[
                    t(`lbl-breakpoint.${breakpoints[activeStep - 1]}`),
                    `(${
                      theme.breakpoints.values[breakpoints[activeStep - 1]]
                    }px)`,
                  ].join(' ')}
                >
                  <ChevronLeftIcon />
                </Tooltip>
              </IconButton>
            }
            nextButton={
              <IconButton
                disabled={
                  disableNextButton || activeStep === breakpoints.length - 1
                }
                onClick={() => onChange(breakpoints[activeStep + 1])}
              >
                <Tooltip
                  title={[
                    t(`lbl-breakpoint.${breakpoints[activeStep + 1]}`),
                    `(${
                      theme.breakpoints.values[breakpoints[activeStep + 1]]
                    }px)`,
                  ].join(' ')}
                >
                  <ChevronRightIcon />
                </Tooltip>
              </IconButton>
            }
          />

          <Divider orientation="vertical" flexItem />

          <ListItemText
            className={classes.label}
            primary={t(`lbl-breakpoint.${breakpoints[activeStep]}`)}
            secondary={`${theme.breakpoints.values[breakpoints[activeStep]]}px`}
            primaryTypographyProps={{
              variant: 'subtitle1',
              color: 'secondary',
              align: 'center',
              whiteSpace: 'nowrap',
            }}
            secondaryTypographyProps={{
              variant: 'caption',
              align: 'center',
              color: 'text.secondary',
            }}
          />
        </Toolbar>
      </AppBar>
    );
  }
);
