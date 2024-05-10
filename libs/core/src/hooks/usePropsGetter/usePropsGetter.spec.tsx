import { renderHook } from '@testing-library/react';
import { useState, type ReactNode } from 'react';
import '@testing-library/jest-dom';

import { GenerateDataProvider } from '../../contexts';
import { usePropsGetter } from './usePropsGetter';

describe('@weavcraft/core/hooks/usePropsGetter', () => {
  it('should return correct props', () => {
    const { result } = renderHook(() => usePropsGetter(), {
      wrapper: TestProvider,
    });

    expect(result.current({ data, propMapping })).toEqual({ name });
  });

  const name = 'Tom';
  const data = { user: { name: 'Tom' } };
  const propMapping = { name: 'user.name' };

  function TestProvider({ children }: { children: ReactNode }) {
    const state = useState(data);

    return (
      <GenerateDataProvider value={state}>{children}</GenerateDataProvider>
    );
  }
});
