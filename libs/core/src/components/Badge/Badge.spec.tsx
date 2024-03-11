import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import Badge from './Badge';

describe('@weavcraft/core/components/Badge', () => {
  it('renders without crashing', () => {
    const { getByTestId } = render(<Badge />);

    expect(getByTestId('BadgeContainer')).toBeInTheDocument();
  });

  it('renders with default props', () => {
    const { getByTestId } = render(<Badge />);

    expect(getByTestId('Badge')).toHaveClass('MuiBadge-anchorOriginTopRight');
  });

  it('renders with custom props', () => {
    const { getByTestId } = render(
      <Badge anchorHorizontal="left" anchorVertical="bottom" />
    );

    expect(getByTestId('Badge')).toHaveClass('MuiBadge-anchorOriginBottomLeft');
  });
});
