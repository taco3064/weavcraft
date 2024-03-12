import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import Button from './Button';

describe('Button', () => {
  it('renders without crashing', () => {
    const { getByTestId } = render(<Button text="Test Button" />);

    expect(getByTestId('Button')).toBeInTheDocument();
  });

  it('renders the correct text', () => {
    const { getByText } = render(<Button text="Test Button" />);

    expect(getByText('Test Button')).toBeInTheDocument();
  });

  it('renders the icon when passed', () => {
    const { baseElement, getByTestId } = render(
      <Button text="Test Button" icon="faClose" />
    );

    expect(getByTestId('Icon_faClose')).toBeInTheDocument();
    expect(
      baseElement.querySelector('.MuiButton-startIcon')
    ).toBeInTheDocument();
  });

  it('renders the icon at the correct position when passed', () => {
    const { baseElement, getByTestId } = render(
      <Button text="Test Button" icon="faClose" iconPosition="end" />
    );

    expect(getByTestId('Icon_faClose')).toBeInTheDocument();
    expect(baseElement.querySelector('.MuiButton-endIcon')).toBeInTheDocument();
  });
});
