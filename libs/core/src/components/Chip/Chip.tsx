import MuiChip from '@mui/material/Chip';

import type { ChipProps, MappablePropNames } from './Chip.types';

import {
  useComponentData,
  withGenerateDataProps,
  type GenericData,
} from '../../contexts';

export default withGenerateDataProps<ChipProps<any>, MappablePropNames>(
  function Chip<D extends GenericData>({
    indicator,
    onClick,
    onDelete,
    ...props
  }: ChipProps<D>) {
    const { data } = useComponentData<D>();

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
);
