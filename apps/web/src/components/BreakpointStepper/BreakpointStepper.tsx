import Box from '@mui/material/Box';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MobileStepper from '@mui/material/MobileStepper';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import { useTranslation } from 'next-i18next';

import { useMainStyles } from './BreakpointStepper.styles';
import type { BreakpointStepperProps } from './BreakpointStepper.types';

export default function BreakpointStepper({
  disableNextButton = false,
  value,
  onChange,
}: BreakpointStepperProps) {
  const { t } = useTranslation();
  const { classes } = useMainStyles();

  const theme = useTheme();
  const breakpoints = theme.breakpoints.keys;
  const activeStep = breakpoints.indexOf(value);

  return (
    <Toolbar variant="dense" className={classes.root}>
      <MobileStepper
        position="static"
        variant="dots"
        className={classes.stepper}
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
                `(${theme.breakpoints.values[breakpoints[activeStep - 1]]}px)`,
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
                `(${theme.breakpoints.values[breakpoints[activeStep + 1]]}px)`,
              ].join(' ')}
            >
              <ChevronRightIcon />
            </Tooltip>
          </IconButton>
        }
      />

      <Divider orientation="vertical" flexItem />

      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        minWidth={theme.spacing(15)}
      >
        <Typography variant="subtitle1" color="secondary" whiteSpace="nowrap">
          {t(`lbl-breakpoint.${breakpoints[activeStep]}`)}
        </Typography>

        <Typography variant="caption" color="text.secondary">
          {theme.breakpoints.values[breakpoints[activeStep]]}px
        </Typography>
      </Box>
    </Toolbar>
  );
}
