import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import TextField from './TextField';

describe('@weavcraft/components/TextField', () => {
  it('should render successfully', () => {
    const { baseElement, getByTestId } = render(<TextField />);

    expect(baseElement).toBeTruthy();
    expect(getByTestId('TextField')).toBeTruthy();
  });
});
