import MuiGrid from '@mui/material/Grid';
import _pick from 'lodash/pick';
import { Children, cloneElement, isValidElement, useMemo } from 'react';
import type { JsonObject } from 'type-fest';

import GridItem from '../GridItem';
import { withDataStructure } from '../../contexts';
import type { GridItemBrakpoints, GridItemProps } from '../GridItem';
import type { GridProps, ItemVariant } from './Grid.types';

export default withDataStructure(function Grid<
  D extends JsonObject,
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
