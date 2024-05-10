import MuiChip from '@mui/material/Chip';
import type { JsonObject } from 'type-fest';

import { useGenerateProps } from '../../hooks';
import type { ChipProps } from './Chip.types';

export default function Chip<D extends JsonObject>(props: ChipProps<D>) {
  const [
    GeneratePropsProvider,
    { indicator, onClick, onDelete, ...chipProps },
    { data },
  ] = useGenerateProps<D, ChipProps<D>>(props);

  return (
    <GeneratePropsProvider>
      <MuiChip
        {...chipProps}
        {...(onClick && {
          clickable: true,
          onClick: () => onClick(data),
        })}
        data-testid="Chip"
        avatar={indicator}
        onDelete={() => onDelete?.(data)}
      />
    </GeneratePropsProvider>
  );
}
