import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import Selection from './Selection';

describe('@weavcraft/core/components/Selection', () => {
  it('should render form control label successfully', () => {
    const { baseElement, getByTestId } = render(<Selection label="test" />);
    const label = getByTestId('FormControlLabel');
    const checkbox = baseElement.querySelector('input[type="checkbox"]');

    expect(baseElement).toBeTruthy();
    expect(checkbox).toBeTruthy();
    expect(baseElement).toHaveTextContent('test');
    expect(label.tagName).toBe('LABEL');
  });

  it('should render checkbox successfully', () => {
    const { baseElement, getByTestId } = render(<Selection />);
    const checkbox = getByTestId('Selection');

    expect(baseElement).toBeTruthy();
    expect(checkbox).toBeTruthy();
    expect(checkbox.tagName).toBe('SPAN');
    expect(baseElement.querySelector('input[type="checkbox"]')).toBeTruthy();
  });

  it('should render radio successfully', () => {
    const { baseElement, getByTestId } = render(<Selection variant="radio" />);
    const checkbox = getByTestId('Selection');

    expect(baseElement).toBeTruthy();
    expect(checkbox).toBeTruthy();
    expect(checkbox.tagName).toBe('SPAN');
    expect(baseElement.querySelector('input[type="radio"]')).toBeTruthy();
  });
});
