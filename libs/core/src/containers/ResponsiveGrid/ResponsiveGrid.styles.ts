import { makeStyles } from 'tss-react/mui';
import type { GridItemStyleParams } from './ResponsiveGrid.types';

export const useItemStyles = makeStyles<GridItemStyleParams>({
  name: 'GridItem',
})((theme, { GridProps, activeId, id, span, transform, transition }) => ({
  root: {
    opacity: !activeId || activeId === id ? 1 : 0.6,
    transition,

    ...(transform && {
      transform: `translate(${transform.x}px, ${transform.y}px)`,
    }),
    ...(GridProps.cols === span.cols
      ? {
          overflow: 'hidden !important',
          height: 'fit-content !important',
        }
      : {
          overflow: 'hidden auto',
          height: `${
            GridProps.rowHeight * span.rows + GridProps.gap * (span.rows - 1)
          }px !important`,
        }),
  },
  content: {
    background: 'transparent',
    overflow: 'hidden auto',
    transition: theme.transitions.create(['width', 'height']),
    width: '100%',
    height:
      activeId !== id ? '100%' : `calc(100% - ${theme.spacing(1)}) !important`,
  },
  dndToggle: {
    cursor: 'grab',
  },
  bar: {
    position: 'sticky' as never,
    bottom: 0,
    marginTop: 'auto',
    zIndex: theme.zIndex.drawer,
  },
  barTitle: {
    padding: 0,

    '& div[role=toolbar]': {
      padding: theme.spacing(0, 2),
      transform: 'scale(0.8) translateX(-12.5%)',
    },
  },
  resizeToggle: {
    cursor: 'nwse-resize',
    transform: 'rotate(45deg) translate(8px, 12px)',
    color: theme.palette.action.disabled,
    outline: 'none !important',

    '&:hover': {
      color: theme.palette.action.active,
    },
  },
}));

export const useMainStyles = makeStyles<{ cols?: number }>({
  name: 'ResponsiveGrid',
})((theme, { cols }) => ({
  root: {
    width: '100%',
    minHeight: '100%',
    height: 'max-content',
    marginY: 0,
    alignContent: 'start',
  },
  container: {
    overflow: 'hidden auto !important',
    ...(typeof cols === 'number' && {
      borderLeft: `1px solid ${theme.palette.divider}`,
      borderRight: `1px solid ${theme.palette.divider}`,
      backgroundSize: `calc(${100 / cols}%) 100%`,
      backgroundImage: `linear-gradient(to right, ${theme.palette.divider} 0.5px, transparent 0.5px), linear-gradient(to left, ${theme.palette.divider} 0.5px, transparent 0.5px)`,
    }),
  },
}));
