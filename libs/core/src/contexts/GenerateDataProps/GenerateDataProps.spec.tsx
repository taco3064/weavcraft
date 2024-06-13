import { act, render, renderHook } from '@testing-library/react';
import { useContext, useState } from 'react';
import type { ReactNode } from 'react';
import '@testing-library/jest-dom';

import { GenerateDataProvider } from './GenerateDataProps';

import {
  GenerateDataContext,
  useGenerateData,
} from './GenerateDataProps.hooks';

describe('@weavcraft/core/contexts/GenerateDataProps', () => {
  //* - Provider
  describe('GenerateDataProvider', () => {
    it('provides the correct value to children', () => {
      const testValue = 'test value';

      const { getByText } = render(
        <GenerateDataProvider value={[testValue, () => null]}>
          <TestComponent />
        </GenerateDataProvider>
      );

      expect(getByText(testValue)).toBeInTheDocument();
    });

    const TestComponent = () => {
      const [value] = useContext(GenerateDataContext);

      return <div>{value}</div>;
    };
  });

  //* - Custom Hooks
  describe('useGenerateData', () => {
    it('should return data from ComponentDataContext', () => {
      const { result } = renderHook(() => useGenerateData(), {
        wrapper: TestProvider,
      });

      const newData = { foo: 'changed' };
      const { type, data, onChange } = result.current;

      expect(type).toBe('context');
      expect(data).toEqual(data);

      act(() => onChange(newData));
      expect(result.current.data).toEqual(newData);
    });

    const data = { foo: 'bar' };

    function TestProvider({ children }: { children: ReactNode }) {
      const state = useState(data);

      return (
        <GenerateDataContext.Provider value={state}>
          {children}
        </GenerateDataContext.Provider>
      );
    }
  });
});
