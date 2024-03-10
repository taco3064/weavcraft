import { fireEvent, render, renderHook } from '@testing-library/react';
import { useState } from 'react';
import '@testing-library/jest-dom';

import Icon from '../Icon';
import MultipleSelectField from './MultipleSelectField';

describe('@weavcraft/core/components/MultipleSelectField', () => {
  it('should render with all options successfully', () => {
    const { getAllByTestId, getByTestId, getByRole } = render(
      <MultipleSelectField
        records={records}
        optionProps={{
          propMapping: {
            primary: 'name',
            value: 'id',
          },
        }}
      />
    );
    const select = getByTestId('MultipleSelectField');

    expect(select).toBeTruthy();
    fireEvent.mouseDown(getByRole('combobox'));
    expect(getByTestId('MultipleSelectFieldMenu')).toBeTruthy();

    const options = getAllByTestId('SingleSelectFieldOption');

    expect(options).toHaveLength(records.length);

    options.forEach((option, i) => {
      expect(option).toHaveTextContent(records[i].name);
      expect(option).toHaveAttribute('data-value', records[i].id);
    });
  });

  it('should render option indicators', () => {
    const { getAllByTestId, getByRole } = render(
      <MultipleSelectField
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

  it('should all chips be rendered', () => {
    const { getAllByTestId } = render(
      <MultipleSelectField
        records={records}
        value={records.map((d) => d.id)}
        optionProps={{
          propMapping: {
            primary: 'name',
            value: 'id',
          },
        }}
      />
    );

    const chips = getAllByTestId('MultipleSelectFieldChip');

    expect(chips).toHaveLength(records.length);
    chips.forEach((chip, i) => expect(chip).toHaveTextContent(records[i].name));
  });

  it('should call onChange with correct data', () => {
    const initIndex = Math.floor(Math.random() * records.length);
    const index = (initIndex + 1) % records.length;
    const { result } = renderHook(() =>
      useState<string[] | undefined>([records[initIndex].id])
    );

    const { getAllByRole, getByRole } = render(
      <MultipleSelectField
        records={records}
        value={result.current[0]}
        onChange={result.current[1]}
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
    expect(result.current[0]).toContain(records[index].id);

    expect(result.current[0]).toEqual(
      [initIndex, index].map((i) => records[i].id)
    );
  });

  it('should call onChange with correct data when removing a chip', () => {
    const indexes = ((index) => [index, (index + 1) % records.length])(
      Math.floor(Math.random() * records.length)
    );

    const { result } = renderHook(() =>
      useState<string[] | undefined>(indexes.map((i) => records[i].id))
    );

    const { getAllByTestId } = render(
      <MultipleSelectField
        records={records}
        value={result.current[0]}
        onChange={result.current[1]}
        optionProps={{
          propMapping: {
            primary: 'name',
            value: 'id',
          },
        }}
      />
    );

    fireEvent.click(getAllByTestId('CancelIcon')[0]);
    expect(result.current[0]).not.toContain(records[indexes[0]].id);
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
