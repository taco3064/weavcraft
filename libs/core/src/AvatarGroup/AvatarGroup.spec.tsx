import { render } from '@testing-library/react';
import AvatarGroup from './AvatarGroup';

describe('@weavcraft/AvatarGroup', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AvatarGroup />);

    expect(baseElement).toBeTruthy();
  });

  it('should render 5 text avatars', () => {
    const { baseElement } = render(
      <AvatarGroup data={data} propMapping={{ text: 'name' }} />
    );

    const els = baseElement.querySelectorAll('div[data-testid="avatar"]');

    expect(els.length).toBe(data.length);
  });

  it('should render 5 img avatars', () => {
    const { baseElement } = render(
      <AvatarGroup
        data={data}
        propMapping={{
          alt: 'name',
          src: 'url',
        }}
      />
    );

    const els = baseElement.querySelectorAll('img');

    expect(els.length).toBe(data.length);
  });

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
});
