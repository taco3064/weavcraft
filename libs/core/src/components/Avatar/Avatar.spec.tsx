import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import Avatar from './Avatar';

describe('@weavcraft/core/components/Avatar', () => {
  it('should render successfully', () => {
    const { getByTestId } = render(<Avatar />);

    expect(getByTestId('Avatar')).toBeTruthy();
  });

  it('should render an image', () => {
    const { baseElement } = render(<Avatar src={data.url} />);
    const el = baseElement.querySelector('img');

    expect(el).toHaveAttribute('src', data.url);
  });

  it('should render text', () => {
    const { getByTestId } = render(<Avatar text={data.name} />);
    const el = getByTestId('Avatar');

    expect(el).toHaveTextContent(data.name.charAt(0));
  });

  it('should correctly apply the width prop', () => {
    const { getByTestId } = render(<Avatar width="80px" />);
    const el = getByTestId('Avatar');

    expect(el).toHaveStyle('width: 80px');
  });

  it('should correctly apply the height prop', () => {
    const { getByTestId } = render(<Avatar height="80px" />);
    const el = getByTestId('Avatar');

    expect(el).toHaveStyle('height: 80px');
  });

  const data = {
    name: 'Remy Sharp',
    url: 'https://mui.com/static/images/avatar/1.jpg',
  };
});
