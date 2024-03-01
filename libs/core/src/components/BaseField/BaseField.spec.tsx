import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import BaseField from './BaseField';

describe('@weavcraft/components/BaseField', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<BaseField />);

    expect(baseElement).toBeTruthy();
  });
});
