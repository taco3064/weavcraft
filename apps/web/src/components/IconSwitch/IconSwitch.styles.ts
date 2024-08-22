import ReactDomServer from 'react-dom/server';
import _get from 'lodash/get';
import { cloneElement } from 'react';
import { makeStyles } from 'tss-react/mui';

import type { IconSwitchProps } from './IconSwitch.types';

export const useMainStyles = makeStyles<
  Pick<IconSwitchProps, 'disabled' | 'options' | 'value'>
>({ name: 'IconSwitch' })((theme, { disabled, options, value }) => {
  const color = _get(theme.palette, [options[value]?.color as string]);
  const opts = Object.entries(options);
  const parser = new DOMParser();
  const serializer = new XMLSerializer();

  const docs = opts.reduce<Record<string, HTMLElement>>(
    (result, [key, { color, icon }]) => {
      const doc = parser.parseFromString(
        ReactDomServer.renderToString(cloneElement(icon)),
        'image/svg+xml'
      );

      const svg = doc.documentElement;

      svg.setAttribute('width', '20');
      svg.setAttribute('height', '20');
      svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');

      svg
        .querySelectorAll('path')
        .forEach((path) =>
          path.setAttribute(
            'fill',
            encodeURIComponent(
              _get(theme.palette, [color as string, 'contrastText']) ||
                theme.palette.text.primary
            )
          )
        );

      return { ...result, [key]: svg };
    },
    {}
  );

  return {
    root: {
      width: 60,
      height: theme.spacing(4),
      padding: theme.spacing(1),
    },
    disabled: {
      background: `linear-gradient(to bottom right, ${theme.palette.action.disabled}, ${theme.palette.text.disabled}) !important`,
    },
    switchBase: {
      padding: 0,
      transform: 'translateX(6px)',
    },
    checked: {
      color: '#fff',
      transform: 'translateX(22px)',
    },
    track: {
      opacity: '1 !important',
      background: `${theme.palette.divider} !important`,
      borderRadius: 20 / 2,
    },
    thumb: {
      width: theme.spacing(4),
      height: theme.spacing(4),

      background: `linear-gradient(to bottom right, ${
        (!disabled && color?.main) || theme.palette.grey['500']
      }, ${(!disabled && color?.dark) || theme.palette.grey['800']})`,

      transition: theme.transitions.create('background', {
        easing: theme.transitions.easing.sharp,
        duration:
          theme.transitions.duration[
            value === opts[1][0] ? 'enteringScreen' : 'leavingScreen'
          ],
      }),
      '&::before': {
        content: "''",
        position: 'absolute',
        width: '100%',
        height: '100%',
        left: 0,
        top: 0,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundImage: `url('data:image/svg+xml;utf8,${serializer.serializeToString(
          docs[value]
        )}')`,
      } as never,
    },
  };
});
