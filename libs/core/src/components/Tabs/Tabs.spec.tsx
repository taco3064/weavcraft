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
    const items = [{ label: 'Tab1' }, { label: 'Tab2' }];
    const { getAllByTestId } = render(<Tabs items={items} />);

    expect(getAllByTestId('Tab')).toHaveLength(items.length);
  });

  it('switches tabs correctly', () => {
    const content = ['content1', 'content2'];

    const { getByTestId, getAllByTestId } = render(
      <Tabs
        items={[
          {
            label: 'Tab1',
            children: (
              <Typography
                data={{ content: content[0] }}
                propMapping={{ text: 'content' }}
              />
            ),
          },
          {
            label: 'Tab2',
            children: (
              <Button
                data={{ label: content[1] }}
                propMapping={{ text: 'label' }}
              />
            ),
          },
        ]}
      />
    );

    const tabs = getAllByTestId('Tab');

    expect(getByTestId('Typography')).toHaveTextContent(content[0]);
    fireEvent.click(tabs[1]);
    expect(getByTestId('Button')).toHaveTextContent(content[1]);
  });
});
