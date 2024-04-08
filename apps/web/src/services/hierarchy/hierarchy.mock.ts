import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import type { ThemePalette } from '@weavcraft/types';

import type { SearchHierarchyParams } from './hierarchy.types';

if (process.env.NODE_ENV === 'development') {
  const mock = new MockAdapter(axios);

  mock.onPost('/api/hierarchy/search').reply((config) => {
    const {
      category,
      superior = '0',
      withPayload = false,
    } = JSON.parse(config.data) as SearchHierarchyParams;

    return [
      200,
      [
        ...Array.from({ length: Math.ceil(Math.random() * 3) }).map(
          (_el, i) => ({
            _id: `${superior}-${i + 1}`,
            category,
            title: `Group ${superior}-${i + 1}`,
            description: `Description for Group ${superior}-${i + 1}`,
            type: 'group',
          })
        ),
        {
          _id: `${superior}-i1`,
          category,
          title: `category ${superior}-3`,
          description: `Description for category ${superior}-3`,
          type: 'item',
          ...(category === 'themes' &&
            withPayload && {
              payload: { ...getThemePalette(), id: `${superior}-3` },
            }),
        },
      ],
    ];
  });
}

function getThemePalette(): Omit<ThemePalette, 'id'> {
  return {
    divider: 'rgba(255, 255, 255, 0.12)',
    mode: 'dark',
    background: {
      default: '#182954',
      paper: '#1C263E',
    },
    text: {
      primary: '#FFA785',
      secondary: '#FFDFB2',
      disabled: 'rgba(255, 255, 255, 0.5)',
    },
    primary: {
      main: '#D24E30',
      contrastText: '#FFF',
    },
    secondary: {
      main: '#FFAB61',
      contrastText: '#FFF',
    },
    info: {
      main: '#4586E2',
      contrastText: '#FFF',
    },
    success: {
      main: '#72CC91',
      contrastText: '#FFF',
    },
    warning: {
      main: '#FFA33D',
      contrastText: '#FFF',
    },
    error: {
      main: '#FF6B6B',
      contrastText: '#FFF',
    },
  };
}
