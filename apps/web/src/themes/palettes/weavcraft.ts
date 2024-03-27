import type { PaletteOptions } from '@mui/material/styles';

export const WEAVCRAFT: PaletteOptions = {
  mode: 'dark',
  divider: 'rgba(255, 255, 255, 0.12)',
  contrastThreshold: 3,
  background: {
    paper: '#111e2f',
    default: '#0e1a2c',
  },
  primary: {
    light: '#366a83',
    main: '#72a999',
    dark: '#366a83',
    contrastText: '#F2F7F6',
  },
  secondary: {
    light: '#4282B3',
    main: '#33658A',
    dark: '#2C5777',
    contrastText: '#F0F5F9',
  },
  info: {
    light: '#C2CFFF',
    main: '#9BB1FF',
    dark: '#708FFF',
    contrastText: '#000D3D',
  },
  success: {
    light: '#E6FEAE',
    main: '#DBFE87',
    dark: '#CDFD5D',
    contrastText: '#2B3D01',
  },
  warning: {
    light: '#ffdd99',
    main: '#ffb366',
    dark: '#cc8800',
    contrastText: '#291400',
  },
  error: {
    light: '#ff9999',
    main: '#ff6666',
    dark: '#cc3333',
    contrastText: '#FFEBEB',
  },
  text: {
    primary: '#fff',
    secondary: '#ddd',
    disabled: 'rgba(255, 255, 255, 0.5)',
  },
};
