import { fireEvent, render, renderHook } from '@testing-library/react';
import type { MouseEventHandler, ReactNode } from 'react';
import '@testing-library/jest-dom';

import { makeStoreProps, withGenerateDataProps } from './GenerateDataProps';

import {
  ComponentDataContext,
  DataStructureContext,
  useComponentData,
  useComponentSlot,
  useDataStructure,
  usePropsGetter,
  useSymbolId,
} from './GenerateDataProps.hooks';

import type {
  GenericData,
  PropsWithMappedStore,
  SlotElement,
} from './GenerateDataProps.types';

describe('@weavcraft/core/contexts/GenerateDataProps', () => {
  //* HOC
  describe('withGenerateDataProps', () => {
    it('should pass correct props to the wrapped component', () => {
      const value = 'Tom White';

      const { getByTestId } = render(
        <WrappedDummy data={{ name: value }} propMapping={{ title: 'name' }} />
      );

      expect(getByTestId('dummy')).toHaveTextContent(value);
    });

    it('should pass the original props', () => {
      const value = 'Johnny Smith';

      const { getByTestId } = render(
        <WrappedDummy
          title={value}
          data={{ name: 'Tom White' }}
          propMapping={{ title: 'name' }}
        />
      );

      expect(getByTestId('dummy')).toHaveTextContent(value);
    });

    it('should useComponentData works correctly', () => {
      const value = 'White';

      const { getByText } = render(
        <WrappedDummy
          data={{ firstName: 'Tom', lastName: value }}
          propMapping={{ title: 'firstName' }}
        >
          <WrappedDummy propMapping={{ title: 'lastName' }} />
        </WrappedDummy>
      );

      expect(getByText(value)).toBeTruthy();
    });

    const WrappedDummy = withGenerateDataProps(
      (props: { title?: string; children?: ReactNode }) => (
        <div data-testid="dummy">
          {props.title}
          {props.children}
        </div>
      )
    );
  });

  describe('makeStoreProps', () => {
    it('should pass correct props to the wrapped component', () => {
      const { getByTestId } = render(<WrappedDummies records={records} />);
      const spans = getByTestId('dummies').querySelectorAll('span');

      expect(spans).toHaveLength(records.length);

      spans.forEach((span, i) => {
        expect(span).toHaveTextContent(records[i].name);
      });
    });

    it('should pass correct records to the wrapped component with propMapping', () => {
      const { getByTestId } = render(
        <WrappedDummy data={{ override: records }}>
          <WrappedDummies propMapping={{ records: 'override' }} />
        </WrappedDummy>
      );

      expect(getByTestId('dummies').querySelectorAll('span')).toHaveLength(
        records.length
      );
    });

    it('should pass the original props', () => {
      const override = [...records, { name: 'John Doe' }];

      const { getByTestId } = render(
        <WrappedDummy data={{ override }}>
          <WrappedDummies
            records={records}
            propMapping={{ records: 'override' }}
          />
        </WrappedDummy>
      );

      expect(getByTestId('dummies').querySelectorAll('span')).toHaveLength(
        records.length
      );
    });

    const WrappedDummy = withGenerateDataProps(
      (props: { children?: ReactNode }) => (
        <div data-testid="dummy">{props.children}</div>
      )
    );

    const WrappedDummies = makeStoreProps<
      PropsWithMappedStore<{ name: string }>
    >()(function Dummy({ records }) {
      return (
        <div data-testid="dummies">
          {records?.map(({ name }, i) => (
            <span key={i}>{name}</span>
          ))}
        </div>
      );
    });

    const records = [{ name: 'Tom White' }, { name: 'Johnny Smith' }];
  });

  //* Custom Hooks
  describe('useComponentData', () => {
    it('should return data from ComponentDataContext', () => {
      const { result } = renderHook(() => useComponentData(), {
        wrapper: TestProvider,
      });

      expect(result.current).toEqual(data);
    });

    const data = { foo: 'bar' };

    function TestProvider({ children }: { children: ReactNode }) {
      return (
        <ComponentDataContext.Provider value={data}>
          {children}
        </ComponentDataContext.Provider>
      );
    }
  });

  describe('useComponentSlot', () => {
    it('should return correct slot element options', () => {
      const { getByTestId } = renderSlot(<WrappedDummy text="text" />, {
        name: 'any',
      });

      const button = getByTestId('dummy');

      expect(button.tagName).toBe('BUTTON');
      expect(button).toHaveTextContent('text');
    });

    it('should pass the original props', () => {
      const value = 'text';

      const { getByText } = renderSlot(
        <WrappedDummy text={value} propMapping={{ text: 'name' }} />,
        { name: 'any' }
      );

      expect(getByText(value)).toBeTruthy();
    });

    it('calls onClick & onItemToggle when button is clicked', () => {
      const data = { name: 'any' };

      const onClick = jest.fn();
      const onItemToggle = jest.fn();

      const { getByTestId } = renderSlot(
        <WrappedDummy text="test" onClick={onClick} />,
        data,
        onItemToggle
      );

      fireEvent.click(getByTestId('dummy'));
      expect(onClick).toHaveBeenCalled();
      expect(onItemToggle).toHaveBeenCalledWith(data);
    });

    const WrappedDummy = withGenerateDataProps(
      (props: { text?: string; onClick?: MouseEventHandler }) => (
        <button data-testid="dummy" onClick={props.onClick}>
          {props.text}
        </button>
      )
    );

    function renderSlot<D extends GenericData>(
      slot: SlotElement,
      data: D,
      onItemToggle?: (item: D) => void
    ) {
      const { result } = renderHook(() => useComponentSlot(slot, onItemToggle));

      const { Slot, getSlotProps } = result.current;

      return render(Slot ? <Slot {...getSlotProps(data)} /> : <>none</>);
    }
  });

  describe('useDataStructure', () => {
    it('should return correct values', () => {
      const { result } = renderHook(() => useDataStructure(), {
        wrapper: TestProvider,
      });

      expect(result.current).toEqual({ superior: uid, paths });
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

  describe('usePropsGetter', () => {
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
      return (
        <ComponentDataContext.Provider value={data}>
          {children}
        </ComponentDataContext.Provider>
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
