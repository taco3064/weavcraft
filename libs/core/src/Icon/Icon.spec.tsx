import { getByTestId, render } from '@testing-library/react';
import Icon from './Icon';

describe('@weavcraft/Icon', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Icon code="faClose" />);
    const el = getByTestId(baseElement, 'faClose');

    expect(el).toBeTruthy();
    expect(el.tagName).toBe('svg');
  });
});
