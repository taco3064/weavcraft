import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { fireEvent, render, within } from '@testing-library/react';
import '@testing-library/jest-dom';

import DateTimePickerField from './DateTimePickerField';

describe('@weavcraft/components/DateTimePickerField', () => {
  it('should render successfully', () => {
    const { getByTestId } = render(
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateTimePickerField />
      </LocalizationProvider>
    );

    const field = getByTestId('DateTimePickerField');

    expect(field).toBeTruthy();
    fireEvent.click(field);

    const menu = getByTestId('DateTimePickerFieldMenu');

    expect(menu).toBeTruthy();
    expect(menu.querySelector('div[role=tablist]')).toBeTruthy();
  });

  it('should render value with format successfully', () => {
    const { getByTestId } = render(
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateTimePickerField
          dateFormat="YYYY/MM/DD"
          timeFormat="HH:mm"
          value="2022/01/01 13:30"
        />
      </LocalizationProvider>
    );

    const field = getByTestId('DateTimePickerField');

    expect(field).toBeTruthy();
    expect(field.querySelector('input')).toHaveValue('2022/01/01 13:30');
  });

  it('should call onChange with formatted value', () => {
    const onChange = jest.fn();

    const { getByTestId } = render(
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateTimePickerField
          name="datetime"
          value="2022-03-20 12:00"
          onChange={onChange}
        />
      </LocalizationProvider>
    );

    fireEvent.click(getByTestId('DateTimePickerField'));

    fireEvent.click(
      getByTestId('DateTimePickerFieldMenu').querySelector(
        'button.MuiPickersDay-root'
      )!
    );

    expect(onChange).toHaveBeenCalledWith('2022-03-01 12:00', 'datetime');
  });
});
