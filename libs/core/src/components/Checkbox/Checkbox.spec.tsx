import { fireEvent, getByTestId, render } from '@testing-library/react';
import '@testing-library/jest-dom';

import Checkbox from './Checkbox';

describe('@weavcraft/Checkbox', () => {
  it('should render form control label successfully', () => {
    const { baseElement } = render(<Checkbox label="test" />);
    const label = getByTestId(baseElement, 'FormControlLabel');
    const checkbox = baseElement.querySelector('input[type="checkbox"]');

    expect(baseElement).toBeTruthy();
    expect(checkbox).toBeTruthy();
    expect(baseElement).toHaveTextContent('test');
    expect(label.tagName).toBe('LABEL');
  });

  it('should render checkbox successfully', () => {
    const { baseElement } = render(<Checkbox />);
    const checkbox = getByTestId(baseElement, 'Checkbox');

    expect(baseElement).toBeTruthy();
    expect(checkbox).toBeTruthy();
    expect(checkbox.tagName).toBe('SPAN');
  });

  it('should render form control label with data', () => {
    const { baseElement } = render(
      <Checkbox
        data={data}
        propMapping={{ label: 'name', checked: 'selected' }}
      />
    );

    const label = getByTestId(baseElement, 'FormControlLabel');

    expect(label).toHaveTextContent(data.name);
  });

  it('should render checkbox with data', () => {
    const { baseElement } = render(
      <Checkbox data={data} propMapping={{ checked: 'selected' }} />
    );

    const checkbox = baseElement.querySelector(
      'input[type="checkbox"]:checked'
    );

    expect(checkbox).toBeTruthy();
  });

  it('should call onChange with correct data', () => {
    const onChange = jest.fn();

    const { baseElement } = render(
      <Checkbox
        data={data}
        propMapping={{ checked: 'selected' }}
        onChange={onChange}
      />
    );

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    fireEvent.click(baseElement.querySelector('input[type="checkbox"]')!);
    expect(onChange).toHaveBeenCalledWith(false, data);
  });

  const data = {
    name: 'Remy Sharp',
    selected: true,
  };
});
