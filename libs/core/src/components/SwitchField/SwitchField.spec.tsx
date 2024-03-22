import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import SwitchField from './SwitchField';

describe('@weavcraft/core/components/SwitchField', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SwitchField />);

    expect(baseElement).toBeTruthy();
  });

  it('calls onChange when clicked', () => {
    const mockOnChange = jest.fn();

    const { getByTestId } = render(
      <SwitchField label="Test" onChange={mockOnChange} />
    );

    const switchInput = getByTestId('SwitchInput');

    fireEvent.click(switchInput);
    expect(mockOnChange).toHaveBeenCalled();
  });

  it('displays the label', () => {
    const { getByText } = render(<SwitchField label="Test" />);

    expect(getByText('Test')).toBeInTheDocument();
  });

  it('displays the placeholder when provided', () => {
    const { getByText } = render(
      <SwitchField label="Test" placeholder="Placeholder" />
    );

    expect(getByText('Placeholder')).toBeInTheDocument();
  });

  it('passes color and size props to SwitchControl', () => {
    const { getByTestId } = render(
      <SwitchField label="Test" color="primary" size="small" />
    );

    const control = getByTestId('SwitchControl');

    expect(control).toHaveClass('MuiSwitch-colorPrimary');
    expect(control.parentElement).toHaveClass('MuiSwitch-sizeSmall');
  });

  it('passes name to onChange when clicked', () => {
    const mockOnChange = jest.fn();

    const { getByTestId } = render(
      <SwitchField
        label="Test"
        name="testName"
        value={true}
        onChange={mockOnChange}
      />
    );

    const switchInput = getByTestId('SwitchInput');

    fireEvent.click(switchInput);
    expect(mockOnChange).toHaveBeenCalledWith(false, 'testName');
  });
});
