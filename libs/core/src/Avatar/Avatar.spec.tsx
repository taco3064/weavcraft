import { getByTestId, render } from '@testing-library/react';
import '@testing-library/jest-dom';

import Avatar from './Avatar';

describe('@weavcraft/Avatar', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Avatar />);

    expect(baseElement).toBeTruthy();
  });

  it('should render an image', () => {
    const { baseElement } = render(
      <Avatar src="https://mui.com/static/images/avatar/1.jpg" />
    );

    const el = baseElement.querySelector('img');

    expect(el).toHaveAttribute(
      'src',
      'https://mui.com/static/images/avatar/1.jpg'
    );
  });

  it('should render text', () => {
    const { baseElement } = render(<Avatar text="A" />);
    const el = getByTestId(baseElement, 'avatar');

    expect(el).toHaveTextContent('A');
  });

  it('should correctly apply the width prop', () => {
    const { baseElement } = render(<Avatar width="80px" />);
    const el = getByTestId(baseElement, 'avatar');

    expect(el).toHaveStyle('width: 80px');
  });

  it('should correctly apply the height prop', () => {
    const { baseElement } = render(<Avatar height="80px" />);
    const el = getByTestId(baseElement, 'avatar');

    expect(el).toHaveStyle('height: 80px');
  });
});
