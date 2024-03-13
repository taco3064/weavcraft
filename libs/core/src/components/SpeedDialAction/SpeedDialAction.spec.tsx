import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import SpeedDialAction from './SpeedDialAction';

describe('@weavcraft/core/components/SpeedDialAction', () => {
  it('renders without crashing', () => {
    const { getByTestId } = render(<SpeedDialAction />);

    expect(getByTestId('SpeedDialAction')).toBeInTheDocument();
  });
});
