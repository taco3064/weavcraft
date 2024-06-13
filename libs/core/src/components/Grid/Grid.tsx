import MuiGrid from '@mui/material/Grid';
import _pick from 'lodash/pick';
import { Children, cloneElement, isValidElement, useMemo } from 'react';
import type { JsonObject } from 'type-fest';

import GridItem from '../GridItem';
import { useCommonStyles } from '../../styles';
import { useStoreProps } from '../../hooks';
import type { GridItemBrakpoints, GridItemProps } from '../GridItem';
import type { GridProps, ItemVariant } from './Grid.types';

export default function Grid<D extends JsonObject, V extends ItemVariant>(
  props: GridProps<D, V>
) {
  const {
    children,
    columns = 12,
    itemVariant,
    itemProps = {},
    records = [],
    ...gridProps
  } = useStoreProps(props);

  const { classes } = useCommonStyles();
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
    <MuiGrid
      {...gridProps}
      container
      data-testid="Grid"
      columns={columns}
      className={classes.minHeight}
    >
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
}
