import { act, render, renderHook } from '@testing-library/react';
import { useContext, useState } from 'react';
import type { JsonObject } from 'type-fest';
import type { ReactNode } from 'react';
import '@testing-library/jest-dom';

import {
  DataStructureProvider,
  GenerateDataProvider,
} from './GenerateDataProps';

import {
  DataStructureContext,
  GenerateDataContext,
  useDataStructure,
  useGenerateData,
  useSymbolId,
} from './GenerateDataProps.hooks';

describe('@weavcraft/core/contexts/GenerateDataProps', () => {
  //* - Provider
  describe('GenerateDataProvider', () => {
    it('provides the correct value to children', () => {
      const testValue = 'test value';

      const { getByText } = render(
        <GenerateDataContext.Provider value={[testValue, () => null]}>
          <TestComponent />
        </GenerateDataContext.Provider>
      );

      expect(getByText(testValue)).toBeInTheDocument();
    });

    const TestComponent = () => {
      const [value] = useContext(GenerateDataContext);

      return <div>{value}</div>;
    };
  });

  describe('DataStructureProvider', () => {
    it('provides the correct context when records is provided', () => {
      const records: JsonObject[] = [{ test: 'test' }];

      const { getByText } = render(
        <DataStructureProvider records={records}>
          <TestComponent />
        </DataStructureProvider>
      );

      expect(getByText(/^Symbol(.+)$/i)).toBeInTheDocument();
    });

    it('provides the correct context when recordsMappingPath is provided', () => {
      const recordsMappingPath = 'test';

      const { getByText } = render(
        <DataStructureProvider recordsMappingPath={recordsMappingPath}>
          <TestComponent />
        </DataStructureProvider>
      );

      expect(getByText(/^Symbol(.+)$/i)).toBeInTheDocument();
    });

    const TestComponent = () => {
      const context = useContext(DataStructureContext);

      return <div>{context?.uid?.toString()}</div>;
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

  describe('useDataStructure', () => {
    it('should return correct values', () => {
      const { result } = renderHook(() => useDataStructure(), {
        wrapper: TestProvider,
      });

      expect(result.current).toEqual({ root: uid, paths });
    });

    const uid = Symbol('uid');
    const paths = ['foo', 'bar'];

    function TestProvider({ children }: { children: ReactNode }) {
      return (
        <DataStructureContext.Provider value={{ uid, paths }}>
          {children}
        </DataStructureContext.Provider>
      );
    }
  });

  describe('useSymbolId', () => {
    it('should return a Symbol', () => {
      const { result } = renderHook(() => useSymbolId());

      expect(typeof result.current).toBe('symbol');
    });

    it('should not return a new Symbol when re-render', () => {
      const { result, rerender } = renderHook(() => useSymbolId());
      const symbol1 = result.current;
      rerender();
      const symbol2 = result.current;
      expect(symbol1).toBe(symbol2);
    });
  });
});
