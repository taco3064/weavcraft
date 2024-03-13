import MuiGrid from '@mui/material/Grid';
import _pick from 'lodash/pick';
import { Children, cloneElement, isValidElement, useMemo } from 'react';

import GridItem, { type GridItemBrakpoints, GridItemProps } from '../GridItem';
import { useGenerateStoreProps, type GenericData } from '../../contexts';
import type { GridProps } from './Grid.types';

export default function Grid<D extends GenericData>(props: GridProps<D>) {
  const {
    children,
    columns = 12,
    itemProps = {},
    records = [],
    ...gridProps
  } = useGenerateStoreProps(props);

  const stringifyProps = JSON.stringify(itemProps);

  const gridItemProps = useMemo<GridItemProps<D>>(() => {
    const itemProps = JSON.parse(stringifyProps) as GridItemProps<D>;

    return Object.entries(
      _pick(itemProps, ['xs', 'sm', 'md', 'lg', 'xl'])
    ).reduce(
      (acc, [key, value]) => ({
        ...acc,
        ...(typeof value === 'number' && {
          [key as GridItemBrakpoints]: Math.floor(
            Math.max(1, Math.min(columns, value))
          ),
        }),
      }),
      itemProps
    );
  }, [columns, stringifyProps]);

  return (
    <MuiGrid {...gridProps} data-testid="Grid" columns={columns}>
      {records?.map((item, i) => (
        <GridItem {...gridItemProps} key={i} data={item}>
          {Children.map(children, (child, ii) =>
            !isValidElement(child) ? null : cloneElement(child, { key: ii })
          )}
        </GridItem>
      ))}
    </MuiGrid>
  );
}
