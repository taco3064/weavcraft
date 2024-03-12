import MuiButton from '@mui/material/Button';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

import Popover from './Popover';

describe('@weavcraft/core/components/Tooltip', () => {
  it('renders correctly', async () => {
    const { baseElement } = render(<Popover>Content</Popover>);

    expect(baseElement).toBeTruthy();
  });

  it('should popup popover', async () => {
    const onClick = jest.fn();

    const { getByTestId, waitForShow } = renderWithShow(
      <Popover toggle={<button onClick={onClick}>Toggle</button>}>
        Content
      </Popover>
    );

    await waitForShow(() => {
      const popover = getByTestId('Popover');

      expect(popover).toBeTruthy();
      expect(popover).toHaveTextContent('Content');
      expect(onClick).toHaveBeenCalled();
    });
  });

  it('renders with anchorPosition prop', async () => {
    const { getByTestId, waitForShow } = renderWithShow(
      <Popover anchorPosition="bottom-left" toggle={<button>Toggle</button>}>
        Content
      </Popover>
    );

    await waitForShow(() => {
      expect(getByTestId('PopoverToggle')).toHaveClass(
        'PopoverAnchor-bottom-left'
      );

      expect(getByTestId('Popover')).toHaveClass('PopoverTransform-top-right');
    });
  });

  function renderWithShow(...e: Parameters<typeof render>) {
    const result = render(...e);

    const waitForShow: typeof waitFor<void> = async (f) => {
      fireEvent.click(result.getByTestId('PopoverToggle'));

      return waitFor(f);
    };

    return { ...result, waitForShow };
  }
});
