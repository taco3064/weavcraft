import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import tc from 'tinycolor2';
import type { ThemePalette } from '@weavcraft/types';

import type { SearchHierarchyParams } from './hierarchy.types';

if (process.env.NODE_ENV === 'development') {
  const mock = new MockAdapter(axios);

  mock.onPost('/api/hierarchy/search').reply((config) => {
    const {
      category,
      superior = '',
      withPayload = false,
    } = JSON.parse(config.data) as SearchHierarchyParams;

    const prefix = superior ? `${superior}-` : '';

    return [
      200,
      [
        ...Array.from({ length: Math.floor(Math.random() * 3) }).map(
          (_el, i) => {
            const id = `${prefix}${i + 1}`;

            return {
              _id: id,
              category,
              title: `Group ${id}`,
              description: `Description for Group ${id}`,
              type: 'group',
            };
          }
        ),
        ...Array.from({ length: Math.ceil(Math.random() * 6) }).map(
          (_el, i) => {
            const id = `${prefix}i${i + 1}`;

            return {
              _id: id,
              category,
              title: `${category} ${id}`,
              description: `Description for ${category} ${id}.\nThis is a long description that should be truncated.`,
              type: 'item',
              // ...(category === 'themes' &&
              //   withPayload && {
              //     payload: { ...getThemePalette(), id },
              //   }),
            };
          }
        ),
      ],
    ];
  });

  mock.onGet(/\/api\/hierarchy\/superiors\/\d+/).reply((config) => {
    const id = config.url?.split('/').pop() as string;

    return [
      200,
      id.split('-').map((_el, i, arr) => ({
        _id: arr.slice(0, i + 1).join('-'),
        title: `Group ${arr.slice(0, i + 1).join('-')}`,
      })),
    ];
  });
}

function getThemePalette(): Omit<ThemePalette, 'id'> {
  const bg = tc.random();

  const colors = {
    primary: tc.random(),
    secondary: tc.random(),
    info: tc.random(),
    success: tc.random(),
    warning: tc.random(),
    error: tc.random(),
  };

  return {
    divider: bg.clone().greyscale().toHexString(),
    mode: bg.isDark() ? 'dark' : 'light',
    background: {
      default: bg.toHexString(),
      paper: bg.clone().lighten(5).toHexString(),
    },
    text: {
      primary: bg.clone().spin(180).toHexString(),
      secondary: bg.clone().spin(120).toHexString(),
      disabled: bg.clone().spin(60).toHexString(),
    },
    ...(Object.fromEntries(
      Object.entries(colors).map(([name, color]) => [
        name,
        {
          main: color.toHexString(),
          contrastText: color.spin(180).toHexString(),
        },
      ])
    ) as Pick<
      ThemePalette,
      'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error'
    >),
  };
}
