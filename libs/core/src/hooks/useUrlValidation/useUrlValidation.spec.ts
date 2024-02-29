import { renderHook } from '@testing-library/react';
import { useUrlValidation } from './useUrlValidation';

describe('@weavcraft/useUrlValidation', () => {
  it('should return true if the URL is valid', () => {
    const { result } = renderHook(() =>
      useUrlValidation('https://weavcraft.io')
    );

    expect(result.current).toBe(true);
  });

  it('should return false if the URL is invalid', () => {
    const { result } = renderHook(() => useUrlValidation('weavcraft.io'));

    expect(result.current).toBe(false);
  });

  it('should return false if the URL is empty', () => {
    const { result } = renderHook(() => useUrlValidation(''));

    expect(result.current).toBe(false);
  });
});
