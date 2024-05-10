import MuiContainer from '@mui/material/Container';
import type { JsonObject } from 'type-fest';

import { useGenerateProps } from '../../hooks';
import type { ContainerProps } from './Container.types';

export default function Container<D extends JsonObject>(
  props: ContainerProps<D>
) {
  const [GeneratePropsProvider, containerProps] = useGenerateProps<
    D,
    ContainerProps<D>
  >(props);

  return (
    <GeneratePropsProvider>
      <MuiContainer {...containerProps} data-testid="Container" />
    </GeneratePropsProvider>
  );
}
