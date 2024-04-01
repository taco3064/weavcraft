import type { PaletteOptions } from '@mui/material/styles';

export const WEAVCRAFT: PaletteOptions = {
  mode: 'dark',
  divider: 'rgba(255, 255, 255, 0.12)',
  contrastThreshold: 3,
  background: {
    paper: '#162D3C',
    default: '#101d2e',
  },
  primary: {
    light: '#468EAF',
    main: '#3A7691',
    dark: '#2F5E75',
    contrastText: '#F0F6F9',
  },
  secondary: {
    light: '#CAE3D1',
    main: '#ABD3B7',
    dark: '#94C7A3',
    contrastText: '#315E3F',
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
    light: '#F7CD78',
    main: '#F4B942',
    dark: '#E3B02B',
    contrastText: '#130D01',
  },
  error: {
    light: '#FF8589',
    main: '#FF595E',
    dark: '#FF333A',
    contrastText: '#290001',
  },
  text: {
    primary: '#F0F6F9',
    secondary: '#99C3D6',
    disabled: 'rgba(255, 255, 255, 0.5)',
  },
};
