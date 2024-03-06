import { fireEvent, render, renderHook } from '@testing-library/react';
import { useState } from 'react';
import '@testing-library/jest-dom';

import Icon from '../Icon';
import MultipleSelectField from './MultipleSelectField';

describe('@weavcraft/components/MultipleSelectField', () => {
  it('should render with all options successfully', () => {
    const { getAllByTestId, getByTestId, getByRole } = render(
      <MultipleSelectField
        options={data}
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

    expect(options).toHaveLength(data.length);

    options.forEach((option, i) => {
      expect(option).toHaveTextContent(data[i].name);
      expect(option).toHaveAttribute('data-value', data[i].id);
    });
  });

  it('should render option indicators', () => {
    const { getAllByTestId, getByRole } = render(
      <MultipleSelectField
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

  it('should all chips be rendered', () => {
    const { getAllByTestId } = render(
      <MultipleSelectField
        options={data}
        value={data.map((d) => d.id)}
        optionProps={{
          propMapping: {
            primary: 'name',
            value: 'id',
          },
        }}
      />
    );

    const chips = getAllByTestId('MultipleSelectFieldChip');

    expect(chips).toHaveLength(data.length);
    chips.forEach((chip, i) => expect(chip).toHaveTextContent(data[i].name));
  });

  it('should call onChange with correct data', () => {
    const initIndex = Math.floor(Math.random() * data.length);
    const index = (initIndex + 1) % data.length;
    const { result } = renderHook(() =>
      useState<string[] | undefined>([data[initIndex].id])
    );

    const { getAllByRole, getByRole } = render(
      <MultipleSelectField
        options={data}
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
    expect(result.current[0]).toContain(data[index].id);

    expect(result.current[0]).toEqual(
      [initIndex, index].map((i) => data[i].id)
    );
  });

  it('should call onChange with correct data when removing a chip', () => {
    const indexes = ((index) => [index, (index + 1) % data.length])(
      Math.floor(Math.random() * data.length)
    );

    const { result } = renderHook(() =>
      useState<string[] | undefined>(indexes.map((i) => data[i].id))
    );

    const { getAllByTestId } = render(
      <MultipleSelectField
        options={data}
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
    expect(result.current[0]).not.toContain(data[indexes[0]].id);
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
