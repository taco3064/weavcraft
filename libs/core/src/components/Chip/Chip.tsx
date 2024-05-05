import MuiChip from '@mui/material/Chip';
import { useMemo } from 'react';
import type { JsonObject } from 'type-fest';

import { useGenerateData, withGenerateData } from '../../contexts';
import type { ChipProps, MappablePropNames, WrappedProps } from './Chip.types';

function BaseChip<D extends JsonObject>({
  indicator,
  onClick,
  onDelete,
  ...props
}: ChipProps<D>) {
  const { data } = useGenerateData<D>();

  return (
    <MuiChip
      {...props}
      {...(onClick && {
        clickable: true,
        onClick: () => onClick(data),
      })}
      data-testid="Chip"
      avatar={indicator}
      onDelete={() => onDelete?.(data)}
    />
  );
}

export default function Chip<D extends JsonObject>(props: WrappedProps<D>) {
  const WrappedChip = useMemo(
    () => withGenerateData<ChipProps<D>, MappablePropNames>(BaseChip),
    []
  );

  return <WrappedChip {...props} />;
}
