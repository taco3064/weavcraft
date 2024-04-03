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

export const useItemStyles = makeStyles({ name: 'HierarchyListItem' })(
  (theme) => ({
    card: {
      borderRadius: theme.spacing(2),
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
  })
);

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
  })
);
