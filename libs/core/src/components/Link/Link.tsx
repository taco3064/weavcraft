import MuiLink from '@mui/material/Link';
import type { JsonObject } from 'type-fest';

import Icon from '../Icon';
import { useGenerateProps } from '../../hooks';
import type { LinkProps } from './Link.types';

export default function Link<D extends JsonObject>(props: LinkProps<D>) {
  const [GeneratePropsProvider, { align, icon, text = 'Link', ...linkProps }] =
    useGenerateProps<D, LinkProps<D>>(props);

  return (
    <GeneratePropsProvider>
      <MuiLink
        {...linkProps}
        data-testid="Link"
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
      </MuiLink>
    </GeneratePropsProvider>
  );
}
