import MuiButtonGroup from '@mui/material/ButtonGroup';

import Button from '../Button';
import { withStoreProps, type GenericData } from '../../contexts';
import type { ButtonGroupProps, MappablePropNames } from './ButtonGroup.types';

export default (<D extends GenericData>() =>
  withStoreProps<D, ButtonGroupProps<D>, MappablePropNames>(
    function ButtonGroup({
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
    }
  ))();
