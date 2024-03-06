import { fireEvent, getByTestId, render } from '@testing-library/react';
import '@testing-library/jest-dom';

import CheckboxGroup from './CheckboxGroup';

describe('@weavcraft/components/CheckboxGroup', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CheckboxGroup />);
    const group = getByTestId(baseElement, 'CheckboxGroup');

    expect(baseElement).toBeTruthy();
    expect(group).toBeTruthy();
  });

  it('should render all checkboxes', () => {
    const { baseElement, getAllByTestId } = render(
      <CheckboxGroup
        value={data.filter(({ selected }) => selected).map(({ name }) => name)}
        options={data}
        optionProps={{
          propMapping: { label: 'name', value: 'name' },
        }}
      />
    );

    const checked = baseElement.querySelectorAll(
      'input[type="checkbox"]:checked'
    );

    expect(getAllByTestId('SelectionControl')).toHaveLength(data.length);

    expect(checked).toHaveLength(
      data.filter(({ selected }) => selected).length
    );
  });

  it('should call onChange with correct data', () => {
    const clone = JSON.parse(JSON.stringify(data));
    const onChange = jest.fn();

    const { baseElement } = render(
      <CheckboxGroup
        options={clone}
        optionProps={{
          propMapping: { label: 'name', value: 'name' },
        }}
        onChange={onChange}
      />
    );

    fireEvent.click(baseElement.querySelector('input[type="checkbox"]')!);
    clone[0].selected = !clone[0].selected;
    expect(onChange).toHaveBeenCalled();
  });

  const data = [
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
