import { getByTestId, render } from '@testing-library/react';
import '@testing-library/jest-dom';

import Avatar from './Avatar';

describe('@weavcraft/Avatar', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Avatar />);

    expect(baseElement).toBeTruthy();
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
