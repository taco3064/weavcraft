import MuiButton from '@mui/material/Button';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

import Tooltip from './Tooltip';

describe('@weavcraft/core/components/Tooltip', () => {
  it('renders correctly', () => {
    const { getByTestId, queryByTestId } = render(
      <Tooltip title="Tooltip">
        <MuiButton data-testid="button">Button</MuiButton>
      </Tooltip>
    );

    expect(getByTestId('TooltipContent')).toBeTruthy();
    expect(getByTestId('button')).toBeTruthy();

    fireEvent.click(getByTestId('TooltipContent'));

    waitFor(async () => {
      const tooltip = queryByTestId('Tooltip');

      expect(tooltip).toBeTruthy();
      expect(tooltip).toHaveTextContent('Tooltip');
    });
  });

  it('renders without crashing when target is disabled', () => {
    const { getByTestId, queryByTestId } = render(
      <Tooltip title="Tooltip">
        <MuiButton disabled data-testid="button">
          Button
        </MuiButton>
      </Tooltip>
    );

    expect(getByTestId('TooltipContent')).toBeTruthy();
    expect(getByTestId('button')).toBeTruthy();

    fireEvent.click(getByTestId('TooltipContent'));

    waitFor(async () => {
      const tooltip = queryByTestId('Tooltip');

      expect(tooltip).toBeTruthy();
      expect(tooltip).toHaveTextContent('Tooltip');
    });
  });

  it('tooltip is not rendered when disabled', () => {
    const { getByTestId, queryByTestId } = render(
      <Tooltip title="Tooltip" disabled>
        <MuiButton data-testid="button">Button</MuiButton>
      </Tooltip>
    );

    expect(getByTestId('TooltipContent')).toBeTruthy();
    expect(getByTestId('button')).toBeTruthy();

    fireEvent.click(getByTestId('TooltipContent'));

    waitFor(async () => {
      expect(queryByTestId('Tooltip')).not.toBeTruthy();
    });
  });
});
