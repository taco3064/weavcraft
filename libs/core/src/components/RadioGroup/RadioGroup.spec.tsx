import { fireEvent, getByTestId, render } from '@testing-library/react';
import '@testing-library/jest-dom';

import RadioGroup from './RadioGroup';

describe('@weavcraft/RadioGroup', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<RadioGroup />);
    const group = getByTestId(baseElement, 'RadioGroup');

    expect(baseElement).toBeTruthy();
    expect(group).toBeTruthy();
  });

  it('should render all radios', () => {
    const { baseElement, getAllByTestId } = render(
      <RadioGroup
        value={data.find(({ selected }) => selected)?.name}
        options={data}
        optionProps={{
          propMapping: { label: 'name', value: 'name' },
        }}
      />
    );

    const checked = baseElement.querySelectorAll('input[type="radio"]:checked');

    expect(getAllByTestId('SelectionControl')).toHaveLength(data.length);
    expect(checked).toHaveLength(1);
  });

  it('should call onChange with correct data', () => {
    const clone = JSON.parse(JSON.stringify(data));
    const onChange = jest.fn();

    const { baseElement } = render(
      <RadioGroup
        options={clone}
        optionProps={{
          propMapping: { label: 'name', value: 'name' },
        }}
        onChange={onChange}
      />
    );

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    fireEvent.click(baseElement.querySelector('input[type="radio"]')!);
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
