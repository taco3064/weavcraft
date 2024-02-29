import { getByTestId, render } from '@testing-library/react';
import '@testing-library/jest-dom';

import Avatar from './Avatar';

describe('@weavcraft/Avatar', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Avatar />);

    expect(baseElement).toBeTruthy();
  });

  it('should render an image', () => {
    const { baseElement } = render(<Avatar src={data.url} />);
    const el = baseElement.querySelector('img');

    expect(el).toHaveAttribute('src', data.url);
  });

  it('should render text', () => {
    const { baseElement } = render(<Avatar text={data.name} />);
    const el = getByTestId(baseElement, 'Avatar');

    expect(el).toHaveTextContent(data.name.charAt(0));
  });

  it('should correctly apply the width prop', () => {
    const { baseElement } = render(<Avatar width="80px" />);
    const el = getByTestId(baseElement, 'Avatar');

    expect(el).toHaveStyle('width: 80px');
  });

  it('should correctly apply the height prop', () => {
    const { baseElement } = render(<Avatar height="80px" />);
    const el = getByTestId(baseElement, 'Avatar');

    expect(el).toHaveStyle('height: 80px');
  });

  it('should correctly render image with data', () => {
    const { baseElement } = render(
      <Avatar data={data} propMapping={{ alt: 'name', src: 'url' }} />
    );

    const el = baseElement.querySelector('img');

    expect(el).toHaveAttribute('src', data.url);
  });

  it('should correctly render text with data', () => {
    const { baseElement } = render(
      <Avatar data={data} propMapping={{ text: 'name' }} />
    );

    const el = getByTestId(baseElement, 'Avatar');

    expect(el).toHaveTextContent(data.name.charAt(0));
  });

  const data = {
    name: 'Remy Sharp',
    url: 'https://mui.com/static/images/avatar/1.jpg',
  };
});
