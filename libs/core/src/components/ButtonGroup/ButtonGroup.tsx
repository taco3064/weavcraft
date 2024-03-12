import MuiButtonGroup from '@mui/material/ButtonGroup';

import Button from '../Button';
import { useGenerateStoreProps, type GenericData } from '../../contexts';
import type { ButtonGroupProps } from './ButtonGroup.types';

export default function ButtonGroup<D extends GenericData>(
  props: ButtonGroupProps<D>
) {
  const {
    borderRadiusVariant,
    itemProps,
    records,
    onItemClick,
    ...groupProps
  } = useGenerateStoreProps(props);

  return (
    <MuiButtonGroup
      {...groupProps}
      data-testid="ButtonGroup"
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
