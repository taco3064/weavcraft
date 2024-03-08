import { fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import DateTimePickerField from './DateTimePickerField';
import { renderWithLocalizationProvider } from '../testing.utils';

describe('@weavcraft/components/DateTimePickerField', () => {
  it('should render successfully', () => {
    const { getByTestId } = renderWithLocalizationProvider(
      <DateTimePickerField />
    );

    const field = getByTestId('DateTimePickerField');

    expect(field).toBeTruthy();
    fireEvent.click(field);

    const menu = getByTestId('DateTimePickerFieldMenu');

    expect(menu).toBeTruthy();
    expect(menu.querySelector('div[role=tablist]')).toBeTruthy();
  });

  it('should render value with format successfully', () => {
    const { getByTestId } = renderWithLocalizationProvider(
      <DateTimePickerField
        dateFormat="YYYY/MM/DD"
        timeFormat="HH:mm"
        value="2022/01/01 13:30"
      />
    );

    const field = getByTestId('DateTimePickerField');

    expect(field).toBeTruthy();
    expect(field.querySelector('input')).toHaveValue('2022/01/01 13:30');
  });

  it('should call onChange with formatted value', () => {
    const onChange = jest.fn();

    const { getByTestId } = renderWithLocalizationProvider(
      <DateTimePickerField
        name="datetime"
        value="2022-03-20 12:00"
        onChange={onChange}
      />
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
