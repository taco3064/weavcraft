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
    display: '-webkit-box',
    overflow: 'hidden',
    minHeight: theme.spacing(5),

    '&:not(:hover)': {
      WebkitBoxOrient: 'vertical',
      WebkitLineClamp: 2,
    },
  },
}));

export const useHierarchyStyles = makeStyles({ name: 'HierarchyList' })(
  (theme) => ({
    root: {
      display: 'flex',
      flexDirection: 'column',
      gap: theme.spacing(1.5),
    },
    filter: {
      justifyContent: 'center',
      minHeight: 0,
      height: 'max-content',
    },
    mb: {
      marginBottom: theme.spacing(6),
    },
  })
);
