import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

import Dialog from './Dialog';

describe('@weavcraft/core/components/Dialog', () => {
  it('renders correctly', () => {
    const { baseElement, queryByTestId } = render(<Dialog />);

    expect(baseElement).toBeTruthy();
    expect(queryByTestId('Dialog')).not.toBeTruthy();
    expect(queryByTestId('DialogTitle')).not.toBeTruthy();
    expect(queryByTestId('DialogContent')).not.toBeTruthy();
  });

  it('toggles open and close', async () => {
    const { getByTestId, getByText, queryByTestId } = render(
      <Dialog toggle={<button>Toggle</button>}>Content</Dialog>
    );

    fireEvent.click(getByTestId('DialogToggle'));

    expect(queryByTestId('Dialog')).toBeTruthy();
    expect(queryByTestId('DialogTitle')).toBeTruthy();
    expect(queryByTestId('DialogContent')).toBeTruthy();
    expect(getByText('Content')).toBeTruthy();

    fireEvent.click(getByTestId('DialogCloseButton'));

    await waitFor(() => {
      expect(queryByTestId('Dialog')).not.toBeTruthy();
      expect(queryByTestId('DialogTitle')).not.toBeTruthy();
      expect(queryByTestId('DialogContent')).not.toBeTruthy();
    });
  });

  it('calls onActionClick with text when action button is clicked', async () => {
    const onActionClick = jest.fn();

    const { getByTestId, queryByTestId } = render(
      <Dialog
        toggle={<button>Toggle</button>}
        actions={[{ text: 'Action' }]}
        onActionClick={onActionClick}
      />
    );

    fireEvent.click(getByTestId('DialogToggle'));
    fireEvent.click(getByTestId('DialogAction_0'));

    expect(onActionClick).toHaveBeenCalledWith('Action');

    await waitFor(() => {
      expect(queryByTestId('Dialog')).not.toBeTruthy();
      expect(queryByTestId('DialogTitle')).not.toBeTruthy();
      expect(queryByTestId('DialogContent')).not.toBeTruthy();
    });
  });

  it('calls onActionClick with index when action button is clicked and text is not provided', async () => {
    const onActionClick = jest.fn();

    const { getByTestId, queryByTestId } = render(
      <Dialog
        toggle={<button>Toggle</button>}
        actions={[{}]}
        onActionClick={onActionClick}
      />
    );

    fireEvent.click(getByTestId('DialogToggle'));
    fireEvent.click(getByTestId('DialogAction_0'));

    expect(onActionClick).toHaveBeenCalledWith(0);

    await waitFor(() => {
      expect(queryByTestId('Dialog')).not.toBeTruthy();
      expect(queryByTestId('DialogTitle')).not.toBeTruthy();
      expect(queryByTestId('DialogContent')).not.toBeTruthy();
    });
  });
});
