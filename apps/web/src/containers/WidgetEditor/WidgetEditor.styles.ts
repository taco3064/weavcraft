import { makeStyles } from 'tss-react/mui';
import type {
  ControllerStyleParams,
  MainStyleParams,
} from './WidgetEditor.types';

export const useAppendNodeStyles = makeStyles({
  name: 'AppendNode',
})((theme) => ({
  toggle: {
    background: theme.palette.secondary.main,
    boxShadow: theme.shadows[3],
    color: theme.palette.secondary.contrastText,
    margin: theme.spacing(1),
  },
}));

export const useControllerStyles = makeStyles<ControllerStyleParams>({
  name: 'Controller',
})((theme, { expanded }) => ({
  toggle: {
    background: theme.palette.background.paper,
    border: `2px dotted ${theme.palette.secondary.main}`,
    boxShadow: theme.shadows[3],
    color: theme.palette.secondary.main,
    opacity: expanded ? 0.4 : 1,
    transform: `translateX(${theme.spacing(-2)})`,
    zIndex: 0,

    '&:hover': {
      opacity: 1,
    },
  },
  popover: {
    background: 'transparent',
    paddingRight: theme.spacing(1),
  },
  standard: {
    display: 'none',

    '& + *': {
      filter: `brightness(${expanded ? 1.2 : 1})`,
    },
  },
  toolbar: {
    background: theme.palette.background.paper,
    borderRadius: `${theme.spacing(2.5)} / 50%`,
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
