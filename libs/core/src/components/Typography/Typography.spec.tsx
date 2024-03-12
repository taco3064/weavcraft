import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import Typography from './Typography';

describe('@weavcraft/core/components/Typography', () => {
  it('renders with default props', () => {
    const { getByTestId } = render(<Typography />);
    const typographyElement = getByTestId('Typography');

    expect(typographyElement).toBeInTheDocument();

    expect(typographyElement).toHaveStyle({
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
    });
  });

  it('aligns text to the center', () => {
    const { getByTestId } = render(<Typography align="center" />);

    expect(getByTestId('Typography')).toHaveStyle({ justifyContent: 'center' });
  });

  it('aligns text to the right', () => {
    const { getByTestId } = render(<Typography align="right" />);

    expect(getByTestId('Typography')).toHaveStyle({
      justifyContent: 'flex-end',
    });
  });

  it('renders with children', () => {
    const { getByText } = render(<Typography>Test</Typography>);

    expect(getByText('Test')).toBeInTheDocument();
  });

  it('renders with icon', () => {
    const { getByTestId } = render(<Typography icon="faGithub" />);

    expect(getByTestId('Icon_faGithub')).toBeInTheDocument();
  });
});
