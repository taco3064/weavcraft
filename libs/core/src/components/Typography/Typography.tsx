import MuiTypography from '@mui/material/Typography';
import type { JsonObject } from 'type-fest';

import Icon from '../Icon';
import { useGenerateProps } from '../../hooks';
import type { TypographyProps } from './Typography.types';

export default function Typography<D extends JsonObject>(
  props: TypographyProps<D>
) {
  const [
    GeneratePropsProvider,
    { align, icon, text = 'Typography', ...typographyProps },
  ] = useGenerateProps<D, TypographyProps<D>>(props);

  return (
    <GeneratePropsProvider>
      <MuiTypography
        {...typographyProps}
        data-testid="Typography"
        display="flex"
        flexDirection="row"
        alignItems="center"
        gap={1}
        justifyContent={
          align === 'center'
            ? 'center'
            : align === 'right'
            ? 'flex-end'
            : 'flex-start'
        }
      >
        {icon && <Icon color="inherit" fontSize="inherit" code={icon} />}
        {text}
      </MuiTypography>
    </GeneratePropsProvider>
  );
}
