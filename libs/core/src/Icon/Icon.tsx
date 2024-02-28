import MuiSvgIcon from '@mui/material/SvgIcon';
import _get from 'lodash/get';
import { useMemo } from 'react';

import { FaIcon, type IconProps } from './Icon.types';

export default function Icon({ code, ...props }: IconProps) {
  const options = useMemo(() => {
    const icon = _get(FaIcon, [code, 'icon']);

    if (icon) {
      const [width, height, , , svgPathData] = icon;

      return { width, height, svgPathData };
    }

    return null;
  }, [code]);

  return !options ? null : (
    <MuiSvgIcon
      {...props}
      viewBox={`0 0 ${options.width} ${options.height}`}
      data-testid={code}
    >
      {typeof options.svgPathData === 'string' ? (
        <path d={options.svgPathData} />
      ) : (
        options.svgPathData.map((d, i) => (
          <path key={i} style={{ opacity: i === 0 ? 0.4 : 1 }} d={d} />
        ))
      )}
    </MuiSvgIcon>
  );
}
