import { fireEvent, getByTestId, render } from '@testing-library/react';
import '@testing-library/jest-dom';

import SelectionControl from './SelectionControl';

describe('@weavcraft/components/SelectionControl', () => {
  it('should render form control label successfully', () => {
    const { baseElement } = render(<SelectionControl label="test" />);
    const label = getByTestId(baseElement, 'FormControlLabel');
    const checkbox = baseElement.querySelector('input[type="checkbox"]');

    expect(baseElement).toBeTruthy();
    expect(checkbox).toBeTruthy();
    expect(baseElement).toHaveTextContent('test');
    expect(label.tagName).toBe('LABEL');
  });

  it('should render checkbox successfully', () => {
    const { baseElement } = render(<SelectionControl />);
    const checkbox = getByTestId(baseElement, 'SelectionControl');

    expect(baseElement).toBeTruthy();
    expect(checkbox).toBeTruthy();
    expect(checkbox.tagName).toBe('SPAN');
    expect(baseElement.querySelector('input[type="checkbox"]')).toBeTruthy();
  });

  it('should render radio successfully', () => {
    const { baseElement } = render(<SelectionControl variant="radio" />);
    const checkbox = getByTestId(baseElement, 'SelectionControl');

    expect(baseElement).toBeTruthy();
    expect(checkbox).toBeTruthy();
    expect(checkbox.tagName).toBe('SPAN');
    expect(baseElement.querySelector('input[type="radio"]')).toBeTruthy();
  });

  it('should render form control label with data', () => {
    const { baseElement } = render(
      <SelectionControl data={data} propMapping={{ label: 'name' }} />
    );

    const label = getByTestId(baseElement, 'FormControlLabel');

    expect(label).toHaveTextContent(data.name);
  });

  it('should render checkbox with data', () => {
    const { baseElement } = render(
      <SelectionControl checked data={data} propMapping={{ value: 'code' }} />
    );

    const checkbox = baseElement.querySelector(
      'input[type="checkbox"]:checked'
    );

    expect(checkbox).toBeTruthy();
    expect(checkbox).toHaveAttribute('value', data.code);
  });

  it('should call onChange with correct data', () => {
    const onChange = jest.fn();

    const { baseElement } = render(
      <SelectionControl
        checked
        data={data}
        propMapping={{ value: 'code' }}
        onChange={onChange}
      />
    );

    fireEvent.click(baseElement.querySelector('input[type="checkbox"]')!);
    expect(onChange).toHaveBeenCalledWith(false, data);
  });

  const data = { name: 'Remy Sharp', code: 'HS001' };
});
