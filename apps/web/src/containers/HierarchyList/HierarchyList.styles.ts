import { makeStyles } from 'tss-react/mui';

export const useFilterStyles = makeStyles({ name: 'HierarchyFilter' })(
  (theme) => ({
    root: {
      display: 'flex',
      flexDirection: 'column',
      gap: theme.spacing(1.5),

      '& input, & button': {
        borderRadius: `${theme.spacing(2.5)} / 50%`,
      },
    },
    input: {
      borderRadius: `${theme.spacing(2.5)} / 50%`,

      '& > input': {
        padding: theme.spacing(1.5, 2.5),
      },
    },
  })
);

export const useToolbarStyles = makeStyles({ name: 'HierarchyToolbar' })(
  () => ({
    filter: {
      justifyContent: 'center',
      minHeight: 0,
      height: 'max-content',
    },
  })
);

export const useItemStyles = makeStyles<{
  cols: number;
  isDragging: boolean;
  isDropOver: boolean;
}>({
  name: 'HierarchyListItem',
})((theme, { cols, isDragging, isDropOver }) => ({
  card: {
    borderRadius: theme.spacing(2),

    ...(isDropOver && {
      filter: `brightness(1.2)`,
      opacity: '1 !important',
    }),
    ...(isDragging && {
      position: 'fixed',
      width: `${(100 / cols).toFixed(5)}%`,
      maxWidth: theme.spacing(34),
      zIndex: theme.zIndex.tooltip,
    }),
  },
  dndToggle: {
    cursor: 'grab',
  },
  description: {
    whiteSpace: 'pre-line',
    overflow: 'hidden',
    minHeight: theme.spacing(5),
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 2,

    '&:hover': {
      display: 'block',
    },
  },
  icon: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    fontSize: '6rem',
  },
}));

export const useHierarchyStyles = makeStyles({ name: 'HierarchyList' })(
  (theme) => ({
    root: {
      display: 'flex',
      flexDirection: 'column',
      gap: theme.spacing(1.5),
    },
    list: {
      height: 'max-content',
      marginBottom: theme.spacing(6),
    },
    toParentFab: {
      position: 'fixed',
      bottom: theme.spacing(2),
      left: '50%',
      transform: 'translateX(-50%)',
    },
  })
);
