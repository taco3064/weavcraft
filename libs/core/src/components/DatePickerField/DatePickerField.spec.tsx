import dayjs from 'dayjs';
import { fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import DatePickerField from './DatePickerField';
import { renderWithLocalizationProvider } from '../testing.utils';

describe('@weavcraft/components/DatePickerField', () => {
  it('should render successfully', () => {
    const { getByTestId } = renderWithLocalizationProvider(<DatePickerField />);

    expect(getByTestId('DatePickerField')).toBeTruthy();
    fireEvent.click(getByTestId('DatePickerField'));
    expect(getByTestId('DatePickerFieldMenu')).toBeTruthy();
  });

  it('should render value with format successfully', () => {
    const { getByTestId } = renderWithLocalizationProvider(
      <DatePickerField format="YYYY/MM/DD" value="2022/01/01" />
    );

    const field = getByTestId('DatePickerField');

    expect(field).toBeTruthy();
    expect(field.querySelector('input')).toHaveValue('2022/01/01');
  });

  it('should disable date options with maxDate', () => {
    const value = '2019-03-16';

    const { getByTestId } = renderWithLocalizationProvider(
      <DatePickerField maxDate={value} value={value} />
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

    const { getByTestId } = renderWithLocalizationProvider(
      <DatePickerField minDate={value} value={value} />
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

    const { getByTestId } = renderWithLocalizationProvider(
      <DatePickerField name="date" value="2022-03-20" onChange={onChange} />
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
