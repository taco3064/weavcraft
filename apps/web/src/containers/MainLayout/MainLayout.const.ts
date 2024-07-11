import Logo from '~web/assets/imgs/icon.svg';
import type { DefaultProps } from './MainLayout.types';

export const DEFAULT_PROPS: DefaultProps = {
  logo: {
    inheritViewBox: true,
    component: Logo,
  },
  title: {
    color: 'text.primary',
    fontFamily: ['Monaco', 'comic sans MS'],
    variant: 'h6',
  },
};
