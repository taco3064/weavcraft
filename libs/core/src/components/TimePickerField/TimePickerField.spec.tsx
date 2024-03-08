import { fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import TimePickerField from './TimePickerField';
import { renderWithLocalizationProvider } from '../testing.utils';

describe('@weavcraft/components/TimePickerField', () => {
  it('should render successfully', () => {
    const { getByTestId } = renderWithLocalizationProvider(<TimePickerField />);

    const field = getByTestId('TimePickerField');

    expect(field).toBeTruthy();
    fireEvent.click(field);
    expect(getByTestId('TimePickerFieldMenu')).toBeTruthy();
  });

  it('should render value with format successfully', () => {
    const { getByTestId } = renderWithLocalizationProvider(
      <TimePickerField format="HH+mm" value="13+30" />
    );

    const field = getByTestId('TimePickerField');

    expect(field).toBeTruthy();
    expect(field.querySelector('input')).toHaveValue('13+30');
  });

  it('should disable date options with maxTime', () => {
    const value = '20:30';

    const { getByTestId } = renderWithLocalizationProvider(
      <TimePickerField maxTime={value} value={value} />
    );

    fireEvent.click(getByTestId('TimePickerField'));

    expect(
      getByTestId('TimePickerFieldMenu').querySelectorAll(
        'span.MuiClockNumber-root.Mui-disabled'
      )
    ).toBeTruthy();
  });

  it('should disable date options with minTime', () => {
    const value = '13:30';

    const { getByTestId } = renderWithLocalizationProvider(
      <TimePickerField minTime={value} value={value} />
    );

    fireEvent.click(getByTestId('TimePickerField'));

    expect(
      getByTestId('TimePickerFieldMenu').querySelectorAll(
        'span.MuiClockNumber-root.Mui-disabled'
      )
    ).toBeTruthy();
  });

  it('should call onChange with formatted value', async () => {
    const onChange = jest.fn();

    const { getByTestId } = renderWithLocalizationProvider(
      <TimePickerField name="time" value="15:00" onChange={onChange} />
    );

    fireEvent.click(getByTestId('TimePickerField'));

    const wrapper = getByTestId('TimePickerFieldMenu').querySelector(
      'div.MuiClock-wrapper'
    )!;

    fireEvent.keyDown(wrapper, { key: 'Home' });
    expect(onChange).toHaveBeenCalledWith('00:00', 'time');
  });
});
