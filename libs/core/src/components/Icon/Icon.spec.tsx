import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import Icon from './Icon';

describe('@weavcraft/core/components/Icon', () => {
  it('should render successfully', () => {
    const { getByTestId } = render(<Icon code="faClose" />);
    const el = getByTestId('Icon_faClose');

    expect(el).toBeTruthy();
    expect(el.tagName).toBe('svg');
  });
});
