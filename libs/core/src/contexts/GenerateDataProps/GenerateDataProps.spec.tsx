import { fireEvent, render, renderHook } from '@testing-library/react';
import type { MouseEventHandler, ReactNode } from 'react';
import '@testing-library/jest-dom';

import { useGenerateSlotProps } from './GenerateDataProps.hooks';
import { withGenerateDataProps } from './GenerateDataProps';
import type { GenericData, SlotElement } from './GenerateDataProps.types';

describe('@weavcraft/core/contexts/GenerateDataProps', () => {
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

    it('should useGenerateData works correctly', () => {
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

  describe('useGenerateSlotProps', () => {
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
      const { result } = renderHook(() =>
        useGenerateSlotProps(slot, onItemToggle)
      );

      const { Slot, getSlotProps } = result.current;

      return render(Slot ? <Slot {...getSlotProps(data)} /> : <>none</>);
    }
  });
});
