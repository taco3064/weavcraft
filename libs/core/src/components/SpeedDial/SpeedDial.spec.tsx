import { fireEvent, render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

import SpeedDial from './SpeedDial';

describe('@weavcraft/core/components/SpeedDial', () => {
  it('renders without crashing', () => {
    const { getByTestId } = render(<SpeedDial />);
    const speedDial = getByTestId('SpeedDial');

    expect(speedDial).toBeInTheDocument();
    expect(speedDial).toHaveClass('MuiSpeedDial-directionUp');
  });

  it('should render all actions', async () => {
    const { getAllByTestId } = render(<SpeedDial records={records} />);
    const actions = getAllByTestId('SpeedDialAction');

    expect(actions).toHaveLength(records.length);

    actions.forEach((action) =>
      expect(action).toHaveClass('SpeedDialActionTooltipPlacement-right')
    );
  });

  it('should render all actions with item propMapping', async () => {
    const { baseElement, getByTestId, getAllByTestId, waitForShow } =
      renderWithShow(
        <SpeedDial
          records={records}
          itemProps={{
            propMapping: {
              icon: 'iconName',
              tooltipTitle: 'label',
            },
          }}
        />
      );

    await waitForShow(() => {
      const index = Math.floor(Math.random() * records.length);
      const action = getAllByTestId('SpeedDialAction')[index];
      const data = records[index];

      fireEvent.pointerEnter(action);
      expect(getByTestId(`Icon_${data.iconName}`)).toBeTruthy();

      expect(
        baseElement.querySelector(`[aria-label="${data.label}"]`)
      ).toBeTruthy();
    });
  });

  function renderWithShow(...e: Parameters<typeof render>) {
    const result = render(...e);

    const waitForShow: typeof waitFor<void> = async (f) => {
      fireEvent.pointerEnter(result.getByTestId('SpeedDial'));

      return waitFor(f);
    };

    return { ...result, waitForShow };
  }

  const records = [
    {
      iconName: 'faClose',
      label: 'Close',
    },
    {
      iconName: 'faGithub',
      label: 'GitHub',
    },
  ];
});
