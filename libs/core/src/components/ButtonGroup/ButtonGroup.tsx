import MuiButtonGroup from '@mui/material/ButtonGroup';
import type { JsonObject } from 'type-fest';

import Button from '../Button';
import { withDataStructure } from '../../contexts';
import type { ButtonGroupProps } from './ButtonGroup.types';

export default withDataStructure(function ButtonGroup<D extends JsonObject>({
  borderRadiusVariant,
  itemProps,
  records,
  onItemClick,
  ...props
}: ButtonGroupProps<D>) {
  return (
    <MuiButtonGroup
      {...props}
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
});
