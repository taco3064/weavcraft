import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import TextAreaField from './TextAreaField';

describe('@weavcraft/core/components/TextAreaField', () => {
  it('should render successfully', () => {
    const { getByTestId } = render(<TextAreaField variant="standard" />);
    const textarea = getByTestId('TextAreaField');

    expect(textarea).toBeTruthy();
    expect(textarea.querySelector('.MuiInputBase-input')).toBeTruthy();
  });
});
