import Button, { type ButtonProps } from '@mui/material/Button';
import { render, renderHook } from '@testing-library/react';

import {
  useSlotPropsTransformation,
  usePropsTransformation,
} from './usePropsTransformation';

describe('@weavcraft/hooks/usePropsTransformation', () => {
  it('should transform data to props according to the propMapping', () => {
    const { result } = renderHook(() =>
      usePropsTransformation({
        data: {
          user: {
            name: 'John Doe',
            age: 30,
          },
          location: 'USA',
        },
        propMapping: {
          userName: 'user.name',
          userAge: 'user.age',
          userLocation: 'location',
        },
      })
    );

    expect(result.current).toEqual({
      userName: 'John Doe',
      userAge: 30,
      userLocation: 'USA',
    });
  });

  it('should return the original props if no propMapping is provided', () => {
    const { result } = renderHook(() =>
      usePropsTransformation({
        data: {
          user: {
            name: 'John Doe',
            age: 30,
          },
          location: 'USA',
        },
      })
    );

    expect(result.current).toEqual({});
  });

  it('should return the original props if no data is provided', () => {
    const { result } = renderHook(() =>
      usePropsTransformation({
        propMapping: {
          userName: 'user.name',
          userAge: 'user.age',
          userLocation: 'location',
        },
      })
    );

    expect(result.current).toEqual({});
  });

  it('should return the original props if no data and propMapping are provided', () => {
    const { result } = renderHook(() =>
      usePropsTransformation({ text: 'Hello' })
    );

    expect(result.current).toEqual({ text: 'Hello' });
  });

  it('should return the action component and the props generator', () => {
    const onItemToggle = jest.fn();
    const data = { type: 'primary' };

    const { result } = renderHook(() =>
      useSlotPropsTransformation<{ type: string }, ButtonProps>(
        <Button {...{ propMapping: { color: 'type' } as never }}>
          Click me
        </Button>,
        onItemToggle
      )
    );

    const { Slot, getSlotProps } = result.current;

    expect(Slot).toBe(Button);
    expect(getSlotProps(data)).toHaveProperty('color', 'primary');

    if (Slot) {
      const { baseElement } = render(<Slot {...getSlotProps(data)} />);

      const button = baseElement.querySelector('button');

      button?.click();

      expect(baseElement).toBeTruthy();
      expect(onItemToggle).toHaveBeenCalledWith(data);
    }
  });
});
