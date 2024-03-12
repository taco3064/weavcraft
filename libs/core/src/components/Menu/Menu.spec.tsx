import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

import Menu from './Menu';

describe('@weavcraft/core/components/Menu', () => {
  it('renders correctly', async () => {
    const { baseElement } = render(<Menu />);

    expect(baseElement).toBeTruthy();
  });

  it('should render all menu items as link', async () => {
    const { getAllByTestId, waitForShow } = renderWithShow(
      <Menu
        itemVariant="link"
        records={records}
        toggle={<button>Toggle</button>}
        itemProps={{
          propMapping: {
            primary: 'title',
            href: 'url',
          },
        }}
      />
    );

    await waitForShow(() => {
      const links = getAllByTestId('ListItemLink');

      expect(links).toHaveLength(records.length);

      links.forEach((link, i) => {
        expect(link).toHaveAttribute('href', records[i].url);
      });
    });
  });

  it('should render all menu items as button', async () => {
    const onClick = jest.fn();

    const { queryAllByTestId, queryByTestId, waitForShow } = renderWithShow(
      <Menu
        itemProps={{ propMapping: { primary: 'title' } }}
        itemVariant="button"
        records={records}
        toggle={<button>Toggle</button>}
        onItemClick={onClick}
      />
    );

    await waitForShow(() => {
      const items = queryAllByTestId('ListItemButton');

      expect(queryByTestId('Menu')).toBeTruthy();
      expect(items).toHaveLength(records.length);
    });
  });

  it('should call onItemClick when a button is clicked', async () => {
    const index = Math.floor(Math.random() * records.length);
    const onClick = jest.fn();

    const { queryAllByTestId, waitForShow } = renderWithShow(
      <Menu
        itemProps={{ propMapping: { primary: 'title' } }}
        itemVariant="button"
        records={records}
        toggle={<button>Toggle</button>}
        onItemClick={onClick}
      />
    );

    await waitForShow(() => {
      fireEvent.click(queryAllByTestId('ListItemButton')[index]);
      expect(onClick).toHaveBeenCalledWith(records[index]);
    });
  });

  function renderWithShow(...e: Parameters<typeof render>) {
    const result = render(...e);

    const waitForShow: typeof waitFor<void> = async (f) => {
      fireEvent.click(result.getByTestId('MenuToggle'));

      return waitFor(f);
    };

    return { ...result, waitForShow };
  }

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
