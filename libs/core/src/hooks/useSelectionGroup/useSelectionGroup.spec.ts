import { renderHook, act } from '@testing-library/react';
import {
  useMultipleSelectionGroup,
  useSingleSelectionGroup,
} from './useSelectionGroup';

describe('@weavcraft/hooks/useMultipleSelectionGroup', () => {
  it('should handle multiple selection', () => {
    const onChange = jest.fn();
    const { result } = renderHook(() =>
      useMultipleSelectionGroup({
        name: 'test',
        optionProps: { propMapping: { value: 'id' } },
        options: [{ id: '1' }, { id: '2' }],
        value: ['1'],
        onChange,
      })
    );

    expect(result.current.selected).toEqual([true, false]);

    act(() => {
      result.current.onChange(true, { id: '2' });
    });

    expect(onChange).toHaveBeenCalledWith(['1', '2'], 'test');
  });
});

describe('@weavcraft/hooks/useSingleSelectionGroup', () => {
  it('should handle single selection', () => {
    const onChange = jest.fn();
    const { result } = renderHook(() =>
      useSingleSelectionGroup({
        optionProps: { propMapping: { value: 'id' } },
        options: [{ id: '1' }, { id: '2' }],
        value: '1',
        onChange,
      })
    );

    expect(result.current.selected).toEqual([true, false]);

    act(() => {
      result.current.onChange(true, { id: '2' });
    });

    expect(onChange).toHaveBeenCalledWith('2', undefined);
  });
});
