import { fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom';

import Button from '../Button';
import Typography from '../Typography';
import Tabs from './Tabs';

describe('@weavcraft/core/components/Tabs', () => {
  it('renders without crashing', () => {
    const { getByTestId } = render(<Tabs />);

    expect(getByTestId('Tabs')).toBeInTheDocument();
  });

  it('renders correct number of tabs', () => {
    const { getAllByTestId } = render(<Tabs records={records} />);

    expect(getAllByTestId('Tab')).toHaveLength(records.length);
  });

  it('switches tabs correctly', () => {
    const { getByTestId, getAllByTestId } = render(
      <Tabs records={records}>
        <Typography propMapping={{ text: 'content' }} />
        <Button propMapping={{ text: 'content' }} />
      </Tabs>
    );

    const tabs = getAllByTestId('Tab');

    expect(getByTestId('Typography')).toHaveTextContent(records[0].content);
    fireEvent.click(tabs[1]);
    expect(getByTestId('Button')).toHaveTextContent(records[1].content);
  });

  const records = [{ content: 'content1' }, { content: 'content2' }];
});
