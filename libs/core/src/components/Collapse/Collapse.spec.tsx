import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import Collapse from './Collapse';

describe('@weavcraft/core/components/Collapse', () => {
  it('renders without crashing', () => {
    const { getByTestId } = render(<Collapse />);

    expect(getByTestId('Collapse')).toBeTruthy();
  });

  it('renders the toggle and work with onClick successfully', () => {
    const onClick = jest.fn();

    const { getByTestId, queryByText } = render(
      <Collapse toggle={<button onClick={onClick}>Toggle</button>}>
        <div>content</div>
      </Collapse>
    );

    const toggle = getByTestId('CollapseToggle');

    expect(toggle).toBeTruthy();
    fireEvent.click(toggle);
    expect(queryByText('content')).toBeTruthy();
    expect(onClick).toHaveBeenCalled();
  });

  it('renders the collapse inside the container when containerId is provided', () => {
    const { getByTestId, getByText } = render(
      <>
        <Collapse containerId="container" toggle={<button>Toggle</button>}>
          <div>content</div>
        </Collapse>

        <div id="container" data-testid="container" />
      </>
    );

    const container = getByTestId('container');

    fireEvent.click(getByTestId('CollapseToggle'));

    expect(container.contains(getByTestId('Collapse'))).toBeTruthy();
    expect(container.contains(getByText('content'))).toBeTruthy();
  });
});
