import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import IconButton from './IconButton';

describe('@weavcraft/core/components/Button', () => {
  it('renders without crashing', () => {
    const { getByTestId } = render(<IconButton />);
    const button = getByTestId('IconButton');

    expect(button).toBeInTheDocument();
    expect(button.tagName).toBe('BUTTON');
  });

  it('renders the icon when passed', () => {
    const { getByTestId } = render(<IconButton icon="faClose" />);

    expect(getByTestId('Icon_faClose')).toBeInTheDocument();
  });

  it('renders with href when passed', () => {
    const url = 'https://example.com';
    const { getByTestId } = render(<IconButton icon="faGithub" href={url} />);
    const button = getByTestId('IconButton') as HTMLAnchorElement;

    expect(button.tagName).toBe('A');
    expect(button).toHaveAttribute('href', url);
  });
});
