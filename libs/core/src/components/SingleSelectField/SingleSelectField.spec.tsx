import { fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom';

import Icon from '../Icon';
import SingleSelectField from './SingleSelectField';

describe('@weavcraft/components/SingleSelectField', () => {
  it('should render successfully', () => {
    const { baseElement, getByTestId, getByRole } = render(
      <SingleSelectField />
    );
    const selectField = getByTestId('SingleSelectField');

    expect(baseElement).toBeTruthy();
    expect(selectField).toBeTruthy();

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
        options={data}
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

    expect(options).toHaveLength(data.length);

    options.map((option, i) => {
      expect(option).toHaveTextContent(data[i].name);
      expect(option).toHaveAttribute('data-value', data[i].id);
    });
  });

  it('should render option indicators', () => {
    const { getAllByTestId, getByRole } = render(
      <SingleSelectField
        options={data}
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
    expect(getAllByTestId('Icon_faGithub')).toHaveLength(data.length);
  });

  it('should call onChange with correct data', () => {
    const index = Math.floor(Math.random() * data.length);
    const onChange = jest.fn();

    const { getAllByRole, getByRole } = render(
      <SingleSelectField
        options={data}
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

    expect(onChange).toHaveBeenCalledWith(data[index].id, undefined);
  });

  const data = [
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
