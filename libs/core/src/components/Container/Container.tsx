import MuiContainer from '@mui/material/Container';
import type { JsonObject } from 'type-fest';

import { useCommonStyles } from '../../styles';
import { useGenerateProps } from '../../hooks';
import type { ContainerProps } from './Container.types';

export default function Container<D extends JsonObject>(
  props: ContainerProps<D>
) {
  const [GeneratePropsProvider, containerProps] = useGenerateProps<
    D,
    ContainerProps<D>
  >(props);

  const { classes } = useCommonStyles();

  return (
    <GeneratePropsProvider>
      <MuiContainer
        {...containerProps}
        className={classes.flexColumn}
        data-testid="Container"
      />
    </GeneratePropsProvider>
  );
}
