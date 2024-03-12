import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import Container from './Container';

describe('@weavcraft/core/components/Container', () => {
  it('should render successfully', () => {
    const testText = 'Test Divider Text';
    const { getByText } = render(<Container>{testText}</Container>);

    expect(getByText(testText)).toBeInTheDocument();
  });
});
