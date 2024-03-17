import MuiGrid from '@mui/material/Grid';
import type { ComponentProps, ReactElement } from 'react';

type BaseGridProps = ComponentProps<typeof MuiGrid>;

export interface FlexGridItemProps
  extends Pick<
    BaseGridProps,
    | 'children'
    | 'columnSpacing'
    | 'rowSpacing'
    | 'xs'
    | 'sm'
    | 'md'
    | 'lg'
    | 'xl'
  > {
  header?: ReactElement | null;

  classes?: BaseGridProps['classes'] & {
    content?: string;
  };
}
