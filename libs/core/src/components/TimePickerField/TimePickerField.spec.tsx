import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom';

import TimePickerField from './TimePickerField';

describe('@weavcraft/components/TimePickerField', () => {
  it('should render successfully', () => {
    const { getByTestId } = render(
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <TimePickerField />
      </LocalizationProvider>
    );

    const field = getByTestId('TimePickerField');

    expect(field).toBeTruthy();
    fireEvent.click(field);
    expect(getByTestId('TimePickerFieldMenu')).toBeTruthy();
  });

  it('should render value with format successfully', () => {
    const { getByTestId } = render(
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <TimePickerField format="HH+mm" value="13+30" />
      </LocalizationProvider>
    );

    const field = getByTestId('TimePickerField');

    expect(field).toBeTruthy();
    expect(field.querySelector('input')).toHaveValue('13+30');
  });

  it('should disable date options with maxTime', () => {
    const value = '20:30';

    const { getByTestId } = render(
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <TimePickerField maxTime={value} value={value} />
      </LocalizationProvider>
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

    const { getByTestId } = render(
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <TimePickerField minTime={value} value={value} />
      </LocalizationProvider>
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

    const { getByTestId } = render(
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <TimePickerField name="time" value="15:00" onChange={onChange} />
      </LocalizationProvider>
    );

    fireEvent.click(getByTestId('TimePickerField'));

    const wrapper = getByTestId('TimePickerFieldMenu').querySelector(
      'div.MuiClock-wrapper'
    )!;

    fireEvent.keyDown(wrapper, { key: 'Home' });
    expect(onChange).toHaveBeenCalledWith('00:00', 'time');
  });
});
