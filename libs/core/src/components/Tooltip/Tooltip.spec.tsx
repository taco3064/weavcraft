import MuiButton from '@mui/material/Button';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

import Tooltip from './Tooltip';

describe('@weavcraft/core/components/Tooltip', () => {
  it('renders correctly', async () => {
    const { getByTestId, queryByTestId, waitForShow } = renderWithShow(
      <Tooltip title="Tooltip">
        <MuiButton data-testid="button">Button</MuiButton>
      </Tooltip>
    );

    expect(queryByTestId('Tooltip')).not.toBeTruthy();
    expect(getByTestId('TooltipToggle')).toBeTruthy();
    expect(getByTestId('button')).toBeTruthy();

    await waitForShow(() => {
      const tooltip = getByTestId('Tooltip');

      expect(tooltip).toBeTruthy();
      expect(tooltip).toHaveTextContent('Tooltip');
    });
  });

  it('renders without crashing when target is disabled', async () => {
    const { getByTestId, waitForShow } = renderWithShow(
      <Tooltip title="Tooltip">
        <MuiButton disabled data-testid="button">
          Button
        </MuiButton>
      </Tooltip>
    );

    await waitForShow(() => {
      const tooltip = getByTestId('Tooltip');

      expect(tooltip).toBeTruthy();
      expect(tooltip).toHaveTextContent('Tooltip');
    });
  });

  it('tooltip is not rendered when disabled', async () => {
    const { queryByTestId, waitForShow } = renderWithShow(
      <Tooltip title="Tooltip" disabled>
        <MuiButton data-testid="button">Button</MuiButton>
      </Tooltip>
    );

    await waitForShow(async () => {
      expect(queryByTestId('Tooltip')).not.toBeTruthy();
    });
  });

  it('tooltip is not rendered when title is empty', async () => {
    const { queryByTestId, waitForShow } = renderWithShow(
      <Tooltip>
        <MuiButton data-testid="button">Button</MuiButton>
      </Tooltip>
    );

    await waitForShow(() => {
      expect(queryByTestId('Tooltip')).not.toBeTruthy();
    });
  });

  function renderWithShow(...e: Parameters<typeof render>) {
    const result = render(...e);

    const waitForShow: typeof waitFor<void> = async (f) => {
      fireEvent.touchStart(result.getByTestId('TooltipToggle'));

      return waitFor(f);
    };

    return { ...result, waitForShow };
  }
});
