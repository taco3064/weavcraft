import { getByTestId, render } from '@testing-library/react';
import Icon from './Icon';

describe('@weavcraft/core/components/Icon', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Icon code="faClose" />);
    const el = getByTestId(baseElement, 'Icon_faClose');

    expect(el).toBeTruthy();
    expect(el.tagName).toBe('svg');
  });
});
