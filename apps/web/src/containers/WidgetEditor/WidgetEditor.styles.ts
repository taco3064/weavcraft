import { makeStyles } from 'tss-react/mui';
import type { MainStyleParams, ToggleStyleParams } from './WidgetEditor.types';

export const useAppendNodeStyles = makeStyles<ToggleStyleParams>({
  name: 'AppendNode',
})((theme, { toggleClassName }) => ({
  root: {
    borderRadius: `${theme.spacing(2.5)} / 50%`,
    justifyContent: 'center',
    minHeight: `${theme.spacing(5)} !important`,

    [`&:has(> .${toggleClassName}:hover)`]: {
      filter: 'brightness(1.2)',
      background: `${theme.palette.action.hover} !important`,
    },
  },
  toggle: {
    background: theme.palette.background.paper,
    border: `2px dashed ${theme.palette.primary.main}`,
    boxShadow: theme.shadows[3],
    color: theme.palette.primary.main,
  },
}));

export const useControllerStyles = makeStyles<ToggleStyleParams>({
  name: 'Controller',
})((theme, { toggleClassName }) => ({
  root: {
    width: '100%',
    marginBottom: theme.spacing(1),
    marginRight: theme.spacing(-2),

    '& > *:first-child': {
      minHeight: theme.spacing(6),
    },
    [`&:has(> .${toggleClassName}:hover) > *:first-child`]: {
      filter: 'brightness(1.2)',
      background: `${theme.palette.action.hover} !important`,
    },
  },
  toggle: {
    background: theme.palette.background.paper,
    border: `2px dotted ${theme.palette.secondary.main}`,
    boxShadow: theme.shadows[3],
    color: theme.palette.secondary.main,
    transform: `translateX(${theme.spacing(-2)})`,
  },
  popover: {
    background: 'transparent',
    paddingRight: theme.spacing(1),
  },
  toolbar: {
    background: theme.palette.background.paper,
    borderRadius: `${theme.spacing(2.5)} / 50%`,
    transform: `translateX(${theme.spacing(-1)}) !important`,
  },
}));

export const useMainStyles = makeStyles<MainStyleParams>({
  name: 'WidgetEditor',
})((theme, { marginTop }) => ({
  root: {
    marginTop:
      typeof marginTop === 'number' &&
      Number.isFinite(marginTop) &&
      !Number.isNaN(marginTop)
        ? marginTop
        : 0,
  },
  content: {
    alignItems: 'center',
    background: theme.palette.background.paper,
    borderRadius: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(4, 3),
    userSelect: 'none',
  },
}));
