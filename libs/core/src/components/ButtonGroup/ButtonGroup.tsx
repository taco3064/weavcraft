import MuiButtonGroup from '@mui/material/ButtonGroup';
import type { JsonObject } from 'type-fest';

import Button from '../Button';
import { useCommonStyles } from '../../styles';
import { useStoreProps } from '../../hooks';
import type { ButtonGroupProps } from './ButtonGroup.types';

export default function ButtonGroup<D extends JsonObject>(
  props: ButtonGroupProps<D>
) {
  const {
    borderRadiusVariant,
    itemProps,
    records,
    onItemClick,
    ...buttonGroupProps
  } = useStoreProps(props);

  const { classes } = useCommonStyles();

  return (
    <MuiButtonGroup
      {...buttonGroupProps}
      data-testid="ButtonGroup"
      className={classes.fullWidth}
      style={{
        ...(borderRadiusVariant === 'none' && {
          borderRadius: 0,
        }),
        ...(borderRadiusVariant === 'top' && {
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
        }),
        ...(borderRadiusVariant === 'bottom' && {
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
        }),
      }}
    >
      {records?.map((item, i) => (
        <Button
          {...itemProps}
          key={i}
          data={item}
          onClick={() => onItemClick?.(item)}
        />
      ))}
    </MuiButtonGroup>
  );
}
