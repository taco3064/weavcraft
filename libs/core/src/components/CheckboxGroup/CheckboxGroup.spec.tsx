import { fireEvent, getByTestId, render } from '@testing-library/react';
import '@testing-library/jest-dom';

import CheckboxGroup from './CheckboxGroup';

describe('@weavcraft/CheckboxGroup', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CheckboxGroup />);
    const group = getByTestId(baseElement, 'CheckboxGroup');

    expect(baseElement).toBeTruthy();
    expect(group).toBeTruthy();
  });

  it('should render all checkboxes', () => {
    const { baseElement, getAllByTestId } = render(
      <CheckboxGroup
        options={data}
        optionProps={{
          propMapping: { label: 'name', checked: 'selected' },
        }}
      />
    );

    const checked = baseElement.querySelectorAll(
      'input[type="checkbox"]:checked'
    );

    expect(getAllByTestId('Checkbox')).toHaveLength(data.length);

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
          propMapping: { label: 'name', checked: 'selected' },
        }}
        onChange={onChange}
      />
    );

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    fireEvent.click(baseElement.querySelector('input[type="checkbox"]')!);
    clone[0].selected = !clone[0].selected;
    expect(onChange).toHaveBeenCalled();
    expect(onChange).toHaveBeenCalledWith(clone);
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
