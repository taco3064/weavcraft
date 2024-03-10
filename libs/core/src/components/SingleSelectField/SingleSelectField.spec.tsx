import { fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom';

import Icon from '../Icon';
import SingleSelectField from './SingleSelectField';

describe('@weavcraft/components/SingleSelectField', () => {
  it('should render successfully', () => {
    const { getByTestId, getByRole } = render(
      <SingleSelectField variant="filled" />
    );

    const select = getByTestId('SingleSelectField');

    expect(select).toBeTruthy();
    expect(select.querySelector('.MuiFilledInput-root')).toBeTruthy();

    fireEvent.mouseDown(getByRole('combobox'));
    expect(getByTestId('SingleSelectFieldMenu')).toBeTruthy();
  });

  it('should render with emptyText prop', () => {
    const { getByTestId, getByText, getByRole } = render(
      <SingleSelectField emptyText="Please select" />
    );

    expect(getByText('Please select')).toBeTruthy();
    fireEvent.mouseDown(getByRole('combobox'));

    expect(getByTestId('SingleSelectFieldEmptyOption')).toHaveTextContent(
      'Please select'
    );
  });

  it('should render all options', () => {
    const { getAllByTestId, getByRole } = render(
      <SingleSelectField
        records={records}
        optionProps={{
          propMapping: {
            primary: 'name',
            value: 'id',
          },
        }}
      />
    );

    fireEvent.mouseDown(getByRole('combobox'));

    const options = getAllByTestId('SingleSelectFieldOption');

    expect(options).toHaveLength(records.length);

    options.forEach((option, i) => {
      expect(option).toHaveTextContent(records[i].name);
      expect(option).toHaveAttribute('data-value', records[i].id);
    });
  });

  it('should render option indicators', () => {
    const { getAllByTestId, getByRole } = render(
      <SingleSelectField
        records={records}
        optionIndicator={<Icon code="faGithub" />}
        optionProps={{
          propMapping: {
            primary: 'name',
            value: 'id',
          },
        }}
      />
    );

    fireEvent.mouseDown(getByRole('combobox'));
    expect(getAllByTestId('Icon_faGithub')).toHaveLength(records.length);
  });

  it('should call onChange with correct data', () => {
    const index = Math.floor(Math.random() * records.length);
    const onChange = jest.fn();

    const { getAllByRole, getByRole } = render(
      <SingleSelectField
        records={records}
        onChange={onChange}
        optionProps={{
          propMapping: {
            primary: 'name',
            value: 'id',
          },
        }}
      />
    );

    fireEvent.mouseDown(getByRole('combobox'));
    fireEvent.click(getAllByRole('option')[index]);

    expect(onChange).toHaveBeenCalledWith(records[index].id, undefined);
  });

  const records = [
    {
      id: 'T001',
      name: 'Remy Sharp',
    },
    {
      id: 'T002',
      name: 'Travis Howard',
    },
    {
      id: 'T003',
      name: 'Cindy Baker',
    },
    {
      id: 'T004',
      name: 'Agnes Walker',
    },
    {
      id: 'T005',
      name: 'Trevor Henderson',
    },
  ];
});
