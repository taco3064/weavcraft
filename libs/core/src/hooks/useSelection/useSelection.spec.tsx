import { renderHook, act } from '@testing-library/react';
import { useMultipleSelection, useSingleSelection } from './useSelection';

describe('@weavcraft/hooks/useMultipleSelection', () => {
  it('should handle multiple selection', () => {
    const onChange = jest.fn();
    const { result } = renderHook(() =>
      useMultipleSelection({
        name: 'test',
        optionProps: { propMapping: { value: 'id' } },
        records: [{ id: '1' }, { id: '2' }],
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

describe('@weavcraft/hooks/useSingleSelection', () => {
  it('should handle single selection', () => {
    const onChange = jest.fn();
    const { result } = renderHook(() =>
      useSingleSelection({
        optionProps: { propMapping: { value: 'id' } },
        records: [{ id: '1' }, { id: '2' }],
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
