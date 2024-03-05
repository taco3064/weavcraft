import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import TextAreaField from './TextAreaField';

describe('@weavcraft/components/TextAreaField', () => {
  it('should render successfully', () => {
    const { baseElement, getByTestId } = render(<TextAreaField />);

    expect(baseElement).toBeTruthy();
    expect(getByTestId('TextAreaField')).toBeTruthy();
  });
});
