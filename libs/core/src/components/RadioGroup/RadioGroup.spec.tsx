import { fireEvent, getByTestId, render } from '@testing-library/react';
import '@testing-library/jest-dom';

import RadioGroup from './RadioGroup';

describe('@weavcraft/core/components/RadioGroup', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<RadioGroup />);
    const group = getByTestId(baseElement, 'RadioGroup');

    expect(baseElement).toBeTruthy();
    expect(group).toBeTruthy();
  });

  it('should render all radios', () => {
    const { baseElement, getAllByTestId } = render(
      <RadioGroup
        value={records.find(({ selected }) => selected)?.name}
        records={records}
        optionProps={{
          propMapping: { label: 'name', value: 'name' },
        }}
      />
    );

    const checked = baseElement.querySelectorAll('input[type="radio"]:checked');

    expect(getAllByTestId('SelectionControl')).toHaveLength(records.length);
    expect(checked).toHaveLength(1);
  });

  it('should call onChange with correct data', () => {
    const clone = JSON.parse(JSON.stringify(records));
    const onChange = jest.fn();

    const { baseElement } = render(
      <RadioGroup
        records={clone}
        optionProps={{
          propMapping: { label: 'name', value: 'name' },
        }}
        onChange={onChange}
      />
    );

    fireEvent.click(baseElement.querySelector('input[type="radio"]')!);
    clone[0].selected = !clone[0].selected;
    expect(onChange).toHaveBeenCalled();
  });

  const records = [
    {
      name: 'Remy Sharp',
      selected: false,
    },
    {
      name: 'Travis Howard',
      selected: true,
    },
    {
      name: 'Cindy Baker',
      selected: false,
    },
    {
      name: 'Agnes Walker',
      selected: false,
    },
    {
      name: 'Trevor Henderson',
      selected: true,
    },
  ];
});
