import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import ButtonGroup from './ButtonGroup';

describe('@weavcraft/core/components/ButtonGroup', () => {
  it('should render successfully', () => {
    const { getByTestId } = render(<ButtonGroup />);

    expect(getByTestId('ButtonGroup')).toBeTruthy();
  });

  it('should apply top border radius style when borderRadiusVariant is "top"', () => {
    const { getByTestId } = render(<ButtonGroup borderRadiusVariant="top" />);

    expect(getByTestId('ButtonGroup')).toHaveStyle({
      borderBottomLeftRadius: '0',
      borderBottomRightRadius: '0',
    });
  });

  it('should apply bottom border radius style when borderRadiusVariant is "bottom"', () => {
    const { getByTestId } = render(
      <ButtonGroup borderRadiusVariant="bottom" />
    );

    expect(getByTestId('ButtonGroup')).toHaveStyle({
      borderTopLeftRadius: '0',
      borderTopRightRadius: '0',
    });
  });

  it('should apply no border radius style when borderRadiusVariant is "none"', () => {
    const { getByTestId } = render(<ButtonGroup borderRadiusVariant="none" />);

    expect(getByTestId('ButtonGroup')).toHaveStyle('border-radius: 0');
  });

  it('should render all items', () => {
    const { getAllByTestId } = render(
      <ButtonGroup
        records={records}
        itemProps={{
          propMapping: {
            text: 'title',
            href: 'url',
          },
        }}
      />
    );

    const buttons = getAllByTestId('Button');

    expect(buttons).toHaveLength(records.length);

    records.forEach(({ title, url }, i) => {
      expect(buttons[i]).toHaveTextContent(title);
      expect(buttons[i]).toHaveAttribute('href', url);
    });
  });

  const records = [
    {
      title: 'Brunch this weekend?',
      icon: 'faGithub',
      url: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
      content:
        'I will be in your neighborhood doing errands this weekend. Do you want to grab brunch?',
    },
    {
      title: 'Summer BBQ',
      icon: 'faGithub',
      url: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
      content: 'Who wants to have a cookout this weekend?',
    },
    {
      title: 'Oui Oui',
      icon: 'faGithub',
      url: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
      content: 'Do you have any Paris recs? Have you ever been?',
    },
  ];
});
