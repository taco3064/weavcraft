import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import SelectionControl from './SelectionControl';

describe('@weavcraft/core/components/SelectionControl', () => {
  it('should render form control label successfully', () => {
    const { baseElement, getByTestId } = render(
      <SelectionControl label="test" />
    );
    const label = getByTestId('FormControlLabel');
    const checkbox = baseElement.querySelector('input[type="checkbox"]');

    expect(baseElement).toBeTruthy();
    expect(checkbox).toBeTruthy();
    expect(baseElement).toHaveTextContent('test');
    expect(label.tagName).toBe('LABEL');
  });

  it('should render checkbox successfully', () => {
    const { baseElement, getByTestId } = render(<SelectionControl />);
    const checkbox = getByTestId('SelectionControl');

    expect(baseElement).toBeTruthy();
    expect(checkbox).toBeTruthy();
    expect(checkbox.tagName).toBe('SPAN');
    expect(baseElement.querySelector('input[type="checkbox"]')).toBeTruthy();
  });

  it('should render radio successfully', () => {
    const { baseElement, getByTestId } = render(
      <SelectionControl variant="radio" />
    );
    const checkbox = getByTestId('SelectionControl');

    expect(baseElement).toBeTruthy();
    expect(checkbox).toBeTruthy();
    expect(checkbox.tagName).toBe('SPAN');
    expect(baseElement.querySelector('input[type="radio"]')).toBeTruthy();
  });
});
