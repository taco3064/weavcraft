import { getByTestId, render } from '@testing-library/react';
import '@testing-library/jest-dom';

import AvatarGroup from './AvatarGroup';

describe('@weavcraft/AvatarGroup', () => {
  const data = [
    {
      name: 'Remy Sharp',
      url: 'https://mui.com/static/images/avatar/1.jpg',
    },
    {
      name: 'Travis Howard',
      url: 'https://mui.com/static/images/avatar/2.jpg',
    },
    {
      name: 'Cindy Baker',
      url: 'https://mui.com/static/images/avatar/3.jpg',
    },
    {
      name: 'Agnes Walker',
      url: 'https://mui.com/static/images/avatar/4.jpg',
    },
    {
      name: 'Trevor Henderson',
      url: 'https://mui.com/static/images/avatar/5.jpg',
    },
  ];

  it('should render successfully', () => {
    const { baseElement } = render(<AvatarGroup />);

    expect(baseElement).toBeTruthy();
  });

  it('should render 5 text avatars', () => {
    const { baseElement } = render(
      <AvatarGroup data={data} dataProps={{ text: 'name' }} />
    );

    const avatars = baseElement.querySelectorAll('div[data-testid="avatar"]');

    expect(avatars.length).toBe(5);
  });

  it('should render 5 img avatars', () => {
    const { baseElement } = render(
      <AvatarGroup
        data={data}
        dataProps={{
          alt: 'name',
          src: 'url',
        }}
      />
    );

    const avatars = baseElement.querySelectorAll('img');

    expect(avatars.length).toBe(5);
  });
});
