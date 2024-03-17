import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import GridItem from './GridItem';

describe('@weavcraft/core/components/GridItem', () => {
  it('renders without crashing', () => {
    const { getByTestId } = render(<GridItem />);

    expect(getByTestId('GridItem')).toBeInTheDocument();
  });

  it('renders with title', () => {
    const { getByTestId } = render(<GridItem icon="faGithub" title="Test" />);
    const toolbar = getByTestId('Toolbar');

    expect(toolbar).toHaveTextContent('Test');
    expect(getByTestId('Icon_faGithub')).toBeInTheDocument();
  });

  it('renders with children', () => {
    const { getByTestId } = render(
      <GridItem>
        <div data-testid="test" />
      </GridItem>
    );

    expect(getByTestId('test')).toBeInTheDocument();
  });
});
