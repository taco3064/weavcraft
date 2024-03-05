import { act, fireEvent, render, renderHook } from '@testing-library/react';
import { useState } from 'react';
import '@testing-library/jest-dom';

import NumericField from './NumericField';

describe('@weavcraft/components/NumericField', () => {
  it('renders without crashing', () => {
    const { getByTestId } = render(<NumericField />);
    const field = getByTestId('NumericField');

    expect(getByTestId('NumericInput')).toBeTruthy();
    expect(field).toBeTruthy();
    expect(field.querySelector('input')!).toBeTruthy();
  });

  it('calls onChange when input changes', () => {
    const mockOnChange = jest.fn();
    const { getByTestId } = render(<NumericField onChange={mockOnChange} />);

    fireEvent.change(getByTestId('NumericInput'), { target: { value: '123' } });
    expect(mockOnChange).toHaveBeenCalledWith(123, undefined);

    fireEvent.change(getByTestId('NumericInput'), {
      target: { value: '-123' },
    });

    expect(mockOnChange).toHaveBeenCalledWith(123, undefined);
  });

  it('handles max value', () => {
    const { result } = renderHook(() => useState<number | undefined>(30));

    const { getByTestId } = render(
      <NumericField
        max={20}
        value={result.current[0]}
        onChange={result.current[1]}
      />
    );

    const input = getByTestId('NumericInput');

    expect(input).toHaveValue('20');
    act(() => fireEvent.change(input, { target: { value: '40' } }));
    expect(result.current[0]).toBe(20);
  });

  it('handles min value', () => {
    const { result } = renderHook(() => useState<number | undefined>(10));

    const { getByTestId } = render(
      <NumericField
        min={20}
        value={result.current[0]}
        onChange={result.current[1]}
      />
    );

    const input = getByTestId('NumericInput');

    expect(input).toHaveValue('20');
    act(() => fireEvent.change(input, { target: { value: '5' } }));
    expect(result.current[0]).toBe(20);
  });

  it('handles decimalScale and fixedDecimalScale', () => {
    const { result } = renderHook(() => useState<number | undefined>(123.456));

    const { getByTestId } = render(
      <NumericField
        fixedDecimalScale
        decimalScale={2}
        value={result.current[0]}
        onChange={result.current[1]}
      />
    );

    const input = getByTestId('NumericInput');

    expect(input).toHaveValue('123.46');
    act(() => fireEvent.change(input, { target: { value: '5555.555' } }));
    expect(result.current[0]).toBe(5555.55);
  });

  it('handles allowNegative', () => {
    const { result } = renderHook(() => useState<number | undefined>(-123));

    const { getByTestId } = render(
      <NumericField
        allowNegative
        value={result.current[0]}
        onChange={result.current[1]}
      />
    );

    const input = getByTestId('NumericInput');

    expect(input).toHaveValue('-123');
    act(() => fireEvent.change(input, { target: { value: '-456' } }));
    expect(result.current[0]).toBe(-456);
  });
});
