import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom';

import DatePickerField from './DatePickerField';

describe('@weavcraft/components/DatePickerField', () => {
  it('should render successfully', () => {
    const { getByTestId } = render(
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePickerField />
      </LocalizationProvider>
    );

    expect(getByTestId('DatePickerField')).toBeTruthy();
    fireEvent.click(getByTestId('DatePickerField'));
    expect(getByTestId('DatePickerFieldMenu')).toBeTruthy();
  });

  it('should render value with format successfully', () => {
    const { getByTestId } = render(
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePickerField format="YYYY/MM/DD" value="2022/01/01" />
      </LocalizationProvider>
    );

    const field = getByTestId('DatePickerField');

    expect(field).toBeTruthy();
    expect(field.querySelector('input')).toHaveValue('2022/01/01');
  });

  it('should disable date options with maxDate', () => {
    const value = '2019-03-16';

    const { getByTestId } = render(
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePickerField maxDate={value} value={value} />
      </LocalizationProvider>
    );

    fireEvent.click(getByTestId('DatePickerField'));

    expect(
      getByTestId('DatePickerFieldMenu').querySelectorAll(
        'button.MuiPickersDay-root:disabled'
      )
    ).toHaveLength(dayjs(value).daysInMonth() - dayjs(value).date());
  });

  it('should disable date options with minDate', () => {
    const value = '2019-03-16';

    const { getByTestId } = render(
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePickerField minDate={value} value={value} />
      </LocalizationProvider>
    );

    fireEvent.click(getByTestId('DatePickerField'));

    expect(
      getByTestId('DatePickerFieldMenu').querySelectorAll(
        'button.MuiPickersDay-root:disabled'
      )
    ).toHaveLength(dayjs(value).date() - 1);
  });

  it('should call onChange with formatted value', () => {
    const onChange = jest.fn();

    const { getByTestId } = render(
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePickerField name="date" value="2022-03-20" onChange={onChange} />
      </LocalizationProvider>
    );

    fireEvent.click(getByTestId('DatePickerField'));

    fireEvent.click(
      getByTestId('DatePickerFieldMenu').querySelector(
        'button.MuiPickersDay-root'
      )!
    );

    expect(onChange).toHaveBeenCalledWith('2022-03-01', 'date');
  });
});
