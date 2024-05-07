import MuiDivider from '@mui/material/Divider';
import type { JsonObject } from 'type-fest';

import { useGenerateProps } from '../../hooks';
import type { DividerProps } from './Divider.types';

export default function Divider<D extends JsonObject>(props: DividerProps<D>) {
  const [GeneratePropsProvider, { text, ...dividerProps }] = useGenerateProps<
    D,
    DividerProps<D>
  >(props);

  return (
    <GeneratePropsProvider>
      <MuiDivider {...dividerProps} data-testid="Divider">
        {text}
      </MuiDivider>
    </GeneratePropsProvider>
  );
}
