import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import Toolbar from './Toolbar';

describe('@weavcraft/core/components/Toolbar', () => {
  it('renders the children', () => {
    const { getByTestId } = render(
      <Toolbar>
        <div data-testid="child">Child</div>
      </Toolbar>
    );

    expect(getByTestId('child')).toBeInTheDocument();
  });

  it('renders with default props', () => {
    const { getByTestId } = render(<Toolbar />);
    const appbar = getByTestId('AppBar');

    expect(appbar).toHaveStyle('background: transparent');
    expect(appbar).toHaveStyle('position: sticky');
  });

  it('renders with custom props', () => {
    const { getByTestId } = render(
      <Toolbar color="primary" position="fixed" />
    );

    const appbar = getByTestId('AppBar');

    expect(appbar).toHaveClass('MuiAppBar-colorPrimary');
    expect(appbar).toHaveStyle('position: fixed');
  });

  it('renders with icon prop', () => {
    const { getByTestId } = render(<Toolbar icon="faGithub" />);

    expect(getByTestId('Icon_faGithub')).toBeTruthy();
  });

  it('renders with title prop', () => {
    const { getByText } = render(<Toolbar title="Test Title" />);
    const title = getByText('Test Title');

    expect(title).toBeInTheDocument();
  });
});
