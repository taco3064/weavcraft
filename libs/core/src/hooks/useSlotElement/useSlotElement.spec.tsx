import { fireEvent, render, renderHook } from '@testing-library/react';
import type { JsonObject } from 'type-fest';
import type { MouseEventHandler } from 'react';
import '@testing-library/jest-dom';

import { useSlotElement } from './useSlotElement';
import type { SlotElement } from './useSlotElement.types';

import {
  useGenerateProps,
  type PropsWithMappedData,
} from '../useGenerateProps';

describe('@weavcraft/core/hooks/useSlotElement', () => {
  it('should return correct slot element options', () => {
    const { getByTestId } = renderSlot(<Dummy text="text" />, {
      name: 'any',
    });

    const button = getByTestId('dummy');

    expect(button.tagName).toBe('BUTTON');
    expect(button).toHaveTextContent('text');
  });

  it('should override props by data value', () => {
    const { getByText } = renderSlot(
      <Dummy text="text" propMapping={{ text: 'name' }} />,
      { name: 'any' }
    );

    expect(getByText('any')).toBeTruthy();
  });

  it('calls onClick & onItemToggle when button is clicked', () => {
    const data = { name: 'any' };

    const onClick = jest.fn();
    const onItemToggle = jest.fn();

    const { getByTestId } = renderSlot(
      <Dummy text="test" onClick={onClick} />,
      data,
      onItemToggle
    );

    fireEvent.click(getByTestId('dummy'));
    expect(onClick).toHaveBeenCalled();
    expect(onItemToggle).toHaveBeenCalledWith(data);
  });

  function Dummy<D extends JsonObject>(
    props: PropsWithMappedData<
      D,
      { text?: string; onClick?: MouseEventHandler }
    >
  ) {
    const [GeneratePropsProvider, { text, onClick }] = useGenerateProps<
      D,
      typeof props
    >(props);

    return (
      <GeneratePropsProvider>
        <button data-testid="dummy" onClick={onClick}>
          {text}
        </button>
      </GeneratePropsProvider>
    );
  }

  function renderSlot<D extends JsonObject>(
    slot: SlotElement,
    data: D,
    onItemToggle?: (item: D) => void
  ) {
    const { result } = renderHook(() => useSlotElement<D>(slot, onItemToggle));
    const { Slot, getSlotProps } = result.current;
    const props = getSlotProps(data);

    return render(Slot ? <Slot {...props} /> : <>none</>);
  }
});
