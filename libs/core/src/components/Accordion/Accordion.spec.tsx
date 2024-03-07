import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import Accordion from './Accordion';

describe('@weavcraft/components/Accordion', () => {
  it('renders the title', () => {
    const { getByText } = render(<Accordion title="Test Title" />);

    expect(getByText('Test Title')).toBeInTheDocument();
  });

  it('renders the children when expanded', () => {
    const { getByTestId } = render(
      <Accordion title="Test Title" expanded>
        <div data-testid="child">Child</div>
      </Accordion>
    );

    expect(getByTestId('child')).toBeInTheDocument();
  });

  it('does not render the children when not expanded', () => {
    const { queryByTestId } = render(
      <Accordion title="Test Title">
        <div data-testid="child">Child</div>
      </Accordion>
    );

    expect(queryByTestId('child')).toBeNull();
  });

  it('renders the action when provided', () => {
    const { getByTestId } = render(
      <Accordion
        expanded
        title="Test Title"
        action={<div data-testid="action">Action</div>}
      />
    );

    expect(getByTestId('action')).toBeInTheDocument();
  });

  it('does not render the action when not expanded', () => {
    const { queryByTestId } = render(
      <Accordion
        title="Test Title"
        action={<div data-testid="action">Action</div>}
      />
    );

    expect(queryByTestId('action')).toBeNull();
  });
});
