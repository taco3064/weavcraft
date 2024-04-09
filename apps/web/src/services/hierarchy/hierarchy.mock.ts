import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import tc from 'tinycolor2';
import type { ThemePalette } from '@weavcraft/types';

import type { HierarchyData, SearchHierarchyParams } from './hierarchy.types';

const mock = new MockAdapter(axios);

const baseURLs =
  process.env.NODE_ENV === 'test' ? ['/mocks', '/api'] : ['/mocks'];

baseURLs.forEach((baseURL) => {
  mock
    .onGet(new RegExp(`^${baseURL}/hierarchy/superiors/\\d+$`))
    .reply((config) => {
      const id = config.url?.split('/').pop() as string;

      return [
        200,
        id.split('-').map((_el, i, arr) => ({
          _id: arr.slice(0, i + 1).join('-'),
          title: `Group ${arr.slice(0, i + 1).join('-')}`,
        })),
      ];
    });

  mock.onPost(`${baseURL}/hierarchy/search`).reply((config) => {
    const {
      category,
      superior = '',
      withPayload = false,
    } = JSON.parse(config.data) as SearchHierarchyParams;

    const prefix = superior ? `${superior}-` : '';
    const types = ['group', 'item'] as const;

    const data: HierarchyData<string, any>[] = types
      .map<HierarchyData<string, any>[]>((type) => {
        const isGroup = type === 'group';

        const length = Math[isGroup ? 'floor' : 'ceil'](Math.random() * 3);

        return Array.from({ length }).map<HierarchyData<string, any>>(
          (_el, i) => {
            const id = `${prefix}${isGroup ? '' : 'i'}${i + 1}`;
            const name = isGroup ? 'Group' : category;

            return {
              _id: id,
              category,
              title: `${name} ${id}`,
              type,
              description: `Description for ${name} ${id}.\nThis is a long description that should be truncated.`,
              ...(!isGroup &&
                category === 'themes' &&
                withPayload && {
                  payload: { ...getThemePalette(), id },
                }),
            };
          }
        );
      })
      .flat();

    return [200, data];
  });
});

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
