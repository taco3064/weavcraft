import MuiGrid from '@mui/material/Grid';
import _pick from 'lodash/pick';
import { Children, cloneElement, isValidElement, useMemo } from 'react';

import GridItem from '../GridItem';
import { makeStoreProps, type GenericData } from '../../contexts';
import type { GridItemBrakpoints, GridItemProps } from '../GridItem';
import type { GridProps, ItemVariant } from './Grid.types';

const withStoreProps = makeStoreProps<GridProps>();

export default withStoreProps(function Grid<
  D extends GenericData,
  V extends ItemVariant
>({
  children,
  columns = 12,
  itemVariant,
  itemProps = {},
  records = [],
  ...props
}: GridProps<D, V>) {
  const templates = Children.toArray(children);
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
    <MuiGrid {...props} data-testid="Grid" columns={columns}>
      {records?.map((item, i) => (
        <GridItem {...gridItemProps} key={i} data={item}>
          {(itemVariant === 'unique' ? [templates[i]] : templates).map(
            (template, ii) =>
              !isValidElement(template)
                ? null
                : cloneElement(template, { key: ii })
          )}
        </GridItem>
      ))}
    </MuiGrid>
  );
});
