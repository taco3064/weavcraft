import { renderToString } from 'react-dom/server';
import { makeStyles } from 'tss-react/mui';

import type {
  GridStyleParams,
  GridItemStyleParams,
} from './ResponsiveGrid.types';

export const useItemStyles = makeStyles<GridItemStyleParams>({
  name: 'GridItem',
})((theme, { GridProps, activeId, id, span, transform, transition }) => {
  const baseHeight =
    GridProps.rowHeight * span.rows + GridProps.gap * (span.rows - 1);

  return {
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
            height: `calc(${baseHeight}px + ${
              GridProps.isToolbarShown ? theme.spacing(6) : '0px'
            }) !important`,
          }),
    },
    content: {
      background: 'transparent',
      overflow: 'hidden auto',
      transition: theme.transitions.create(['width', 'height']),
      width: '100%',
      height:
        activeId !== id
          ? '100%'
          : `calc(100% - ${theme.spacing(1)}) !important`,
    },
    dndToggle: {
      cursor: 'grab',
    },
    bar: {
      position: 'sticky' as never,
      bottom: 0,
      marginTop: 'auto',
      zIndex: theme.zIndex.fab,
    },
    barTitle: {
      padding: 0,

      '& div[role=toolbar]': {
        height: theme.spacing(6),
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
  };
});

export const useMainStyles = makeStyles<GridStyleParams>({
  name: 'ResponsiveGrid',
})((_theme, { gap, lines }) => ({
  root: {
    width: '100%',
    height: 'max-content',
    margin: 0,
    alignContent: 'start',
    overflow: 'hidden',
  },
  container: {
    height: 'max-content',
    overflow: 'hidden auto !important',

    ...(lines && {
      '& > ul': {
        paddingLeft: gap / 2,
        paddingRight: gap / 2,
        backgroundRepeat: 'repeat-y',
        backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(
          renderToString(lines)
        )}")`,
      },
    }),
  },
}));
