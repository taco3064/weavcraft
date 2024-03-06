import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import TextField from './TextField';

describe('@weavcraft/components/TextField', () => {
  it('should render successfully', () => {
    const { getByTestId } = render(<TextField variant="outlined" />);
    const text = getByTestId('TextField');

    expect(text).toBeTruthy();
    expect(text.querySelector('.MuiOutlinedInput-root')).toBeTruthy();
  });
});
