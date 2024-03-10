import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import NumericFormatField from './NumericFormatField';

describe('@weavcraft/core/components/NumericFormatField', () => {
  it('renders without crashing', () => {
    const { getByTestId } = render(<NumericFormatField />);

    expect(getByTestId('NumericFormatField')).toBeTruthy();
  });

  it('calls onChange when input changes', () => {
    const mockOnChange = jest.fn();

    const { getByTestId } = render(
      <NumericFormatField onChange={mockOnChange} />
    );

    fireEvent.change(getByTestId('NumericFormatInput'), {
      target: { value: '123' },
    });

    expect(mockOnChange).toHaveBeenCalledWith(123, undefined);
  });

  it('handles format', () => {
    const mockOnChange = jest.fn();

    const { getByTestId } = render(
      <NumericFormatField format="##" onChange={mockOnChange} />
    );

    fireEvent.change(getByTestId('NumericFormatInput'), {
      target: { value: '123' },
    });

    expect(mockOnChange).toHaveBeenCalledWith(12, undefined);
  });

  it('handles allowEmptyFormatting', () => {
    const { getByTestId } = render(
      <NumericFormatField allowEmptyFormatting format="(###) - ##" />
    );
    const input = getByTestId('NumericFormatInput');

    expect(input).toHaveValue('(   ) -   ');
    fireEvent.change(input, { target: { value: '00123' } });
    expect(input).toHaveValue('(001) - 23');
  });

  it('handles format and patternChar', () => {
    const { getByTestId } = render(
      <NumericFormatField format="@@-@@" patternChar="@" />
    );

    const input = getByTestId('NumericFormatInput');

    fireEvent.change(input, { target: { value: '1234' } });
    expect(input).toHaveValue('12-34');
  });
});
