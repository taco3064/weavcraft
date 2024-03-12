import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import Link from './Link';

describe('@weavcraft/core/components/Link', () => {
  it('renders with default props', () => {
    const { getByTestId } = render(<Link />);
    const typographyElement = getByTestId('Link');

    expect(typographyElement).toBeInTheDocument();

    expect(typographyElement).toHaveStyle({
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
    });
  });

  it('aligns text to the center', () => {
    const { getByTestId } = render(<Link align="center" />);

    expect(getByTestId('Link')).toHaveStyle({ justifyContent: 'center' });
  });

  it('aligns text to the right', () => {
    const { getByTestId } = render(<Link align="right" />);

    expect(getByTestId('Link')).toHaveStyle({
      justifyContent: 'flex-end',
    });
  });

  it('renders with children', () => {
    const { getByText } = render(<Link>Test</Link>);

    expect(getByText('Test')).toBeInTheDocument();
  });

  it('renders with icon', () => {
    const { getByTestId } = render(<Link icon="faGithub" />);

    expect(getByTestId('Icon_faGithub')).toBeInTheDocument();
  });

  it('renders with href', () => {
    const url = 'https://weavcraft.com';
    const { getByTestId } = render(<Link href={url} />);

    expect(getByTestId('Link')).toHaveAttribute('href', url);
  });
});
