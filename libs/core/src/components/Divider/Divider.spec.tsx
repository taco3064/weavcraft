import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import Divider from './Divider';

describe('@weavcraft/core/components/Divider', () => {
  it('renders the passed text', () => {
    const testText = 'Test Divider Text';
    const { getByText } = render(<Divider text={testText} />);

    expect(getByText(testText)).toBeInTheDocument();
  });
});
