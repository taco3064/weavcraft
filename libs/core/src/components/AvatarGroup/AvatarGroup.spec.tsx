import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import AvatarGroup from './AvatarGroup';

describe('@weavcraft/components/AvatarGroup', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AvatarGroup />);

    expect(baseElement).toBeTruthy();
  });

  it('should render all text avatars', () => {
    const { getAllByTestId } = render(
      <AvatarGroup records={records} itemProps={{ text: 'name' }} />
    );

    expect(getAllByTestId('Avatar')).toHaveLength(records.length);
  });

  it('should render all img avatars', () => {
    const { getAllByTestId } = render(
      <AvatarGroup records={records} itemProps={{ alt: 'name', src: 'url' }} />
    );

    expect(getAllByTestId('Avatar')).toHaveLength(records.length);
  });

  const records = [
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
