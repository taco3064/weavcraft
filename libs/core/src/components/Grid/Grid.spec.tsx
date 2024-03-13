import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import Container from '../Container';
import Grid from './Grid';

describe('@weavcraft/core/components/Grid', () => {
  it('renders without crashing', () => {
    const { getByTestId } = render(<Grid />);

    expect(getByTestId('Grid')).toBeInTheDocument();
  });

  it('make sure the cols will be valid', () => {
    const max = 24;
    const xs = 25;
    const md = 12;

    const { getAllByTestId } = render(
      <Grid
        columns={max}
        records={records}
        itemProps={{ xs, md, propMapping: { title: 'title' } }}
      />
    );

    getAllByTestId('GridItem').forEach((item) => {
      expect(item).toHaveClass(
        `MuiGrid-grid-xs-${max}`,
        `MuiGrid-grid-md-${md}`
      );
    });
  });

  it('should render all items', () => {
    const { getByTestId, getAllByTestId } = render(
      <Grid
        records={records}
        itemProps={{
          propMapping: {
            icon: 'icon',
            title: 'title',
          },
        }}
      >
        <Container propMapping={{ children: 'content' }} />
      </Grid>
    );

    const items = getAllByTestId('GridItem');

    expect(items).toHaveLength(records.length);

    items.forEach((item, i) => {
      const { title, icon, content } = records[i];

      expect(item).toHaveTextContent(title);
      expect(item).toHaveTextContent(content);
      expect(getByTestId(`Icon_${icon}`)).toBeTruthy();
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
      icon: 'faEdit',
      url: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
      content: 'Who wants to have a cookout this weekend?',
    },
    {
      title: 'Oui Oui',
      icon: 'faClose',
      url: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
      content: 'Do you have any Paris recs? Have you ever been?',
    },
  ];
});
