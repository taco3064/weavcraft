import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import PortalContainer from './PortalContainer';

describe('@weavcraft/core/components/PortalContainer', () => {
  const containerId = 'test-container';

  it('renders with container id', () => {
    const { getByText } = render(
      <>
        <PortalContainer id={containerId}>Test</PortalContainer>
        <div id={containerId} />
      </>
    );

    expect(getByText('Test')).toBeInTheDocument();
  });

  it('renders without container id', () => {
    const { getByText } = render(<PortalContainer>Test</PortalContainer>);

    expect(getByText('Test')).toBeInTheDocument();
  });

  it('calls onContainerRetrieved when container is retrieved', () => {
    const handleContainerRetrieved = jest.fn();

    render(
      <>
        <PortalContainer
          id={containerId}
          onContainerRetrieved={handleContainerRetrieved}
        >
          Test
        </PortalContainer>

        <div id={containerId} />
      </>
    );

    expect(handleContainerRetrieved).toHaveBeenCalled();
  });

  it('does not call onContainerRetrieved when container is not retrieved', () => {
    const handleContainerRetrieved = jest.fn();

    render(
      <PortalContainer
        id="non-existent"
        onContainerRetrieved={handleContainerRetrieved}
      >
        Test
      </PortalContainer>
    );

    expect(handleContainerRetrieved).not.toHaveBeenCalled();
  });
});
