import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import Fab from './Fab';

describe('@weavcraft/core/components/Fab', () => {
  it('renders without crashing', () => {
    const { getByTestId } = render(<Fab />);
    const fab = getByTestId('Fab');

    expect(fab).toBeInTheDocument();

    expect(fab).toHaveStyle({
      position: 'fixed',
      right: '8px',
      bottom: '8px',
    });
  });

  it('renders with text', () => {
    const { getByTestId } = render(<Fab text="Test" />);
    const fab = getByTestId('Fab');

    expect(fab).toHaveTextContent('Test');
    expect(fab).toHaveClass('MuiFab-extended');
  });

  it('renders with icon', () => {
    const { getByTestId } = render(<Fab icon="faGithub" />);

    expect(getByTestId('Icon_faGithub')).toBeInTheDocument();
    expect(getByTestId('Fab')).toHaveClass('MuiFab-circular');
  });

  it('renders with href', () => {
    const url = 'https://example.com';
    const { getByTestId } = render(<Fab href={url} />);
    const fab = getByTestId('Fab');

    expect(fab).toHaveAttribute('href', url);
    expect(fab.tagName).toBe('A');
  });

  it('changes position to absolute when container is retrieved', () => {
    const containerId = 'test-container';

    const { getByTestId } = render(
      <>
        <Fab containerId={containerId} position="top-left" />
        <div id={containerId} data-testid="container" />
      </>
    );

    const container = getByTestId('container');
    const fab = getByTestId('Fab');

    expect(container).toContainElement(fab);
    expect(container).toHaveStyle('position: relative');

    expect(fab).toHaveStyle({
      position: 'absolute',
      top: '8px',
      left: '8px',
    });
  });
});
