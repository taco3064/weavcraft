import { fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom';

import BaseField from './BaseField';

describe('@weavcraft/components/BaseField', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<BaseField />);

    expect(baseElement).toBeTruthy();
  });

  it('calls onChange when input changes', () => {
    const mockOnChange = jest.fn();

    const { getByRole } = render(
      <BaseField name="test" label="Test" onChange={mockOnChange} />
    );

    fireEvent.change(getByRole('textbox'), { target: { value: 'test value' } });
    expect(mockOnChange).toHaveBeenCalledWith('test value', 'test');
  });

  it('displays the label', () => {
    const { getAllByText } = render(<BaseField label="Test" />);

    expect(getAllByText('Test')).toBeTruthy();
  });

  it('displays the adornment when provided', () => {
    const { getByText } = render(
      <BaseField label="Test" adornment="Adornment" />
    );

    expect(getByText('Adornment')).toBeTruthy();
  });

  it('passes additional InputProps to the input', () => {
    const { baseElement } = render(
      <BaseField label="Test" InputProps={{ className: 'test-input' }} />
    );

    expect(baseElement.querySelector('.test-input')).toBeTruthy();
  });
});
