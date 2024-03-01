import { getByTestId, render } from '@testing-library/react';
import '@testing-library/jest-dom';

import List from './List';

describe('@weavcraft/List', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<List />);

    expect(baseElement).toBeTruthy();
  });

  it('should render subheader by title', () => {
    const { baseElement } = render(<List title="My List" />);
    const subheader = getByTestId(baseElement, 'ListSubheader');

    expect(subheader).toBeTruthy();
    expect(subheader.textContent).toBe('My List');
  });

  it('should render subheader by icon', () => {
    const { baseElement } = render(
      <List icon={{ code: 'faGithub', color: 'primary' }} />
    );

    const subheader = getByTestId(baseElement, 'ListSubheader');
    const icon = getByTestId(baseElement, 'Icon_faGithub');

    expect(subheader).toBeTruthy();
    expect(icon).toBeTruthy();
    expect(icon.tagName).toBe('svg');
  });

  it('should render subheader by action', () => {
    const { baseElement } = render(<List action={<button>Click me</button>} />);
    const subheader = getByTestId(baseElement, 'ListSubheader');
    const button = baseElement.querySelector('button');

    expect(subheader).toBeTruthy();
    expect(button).toBeTruthy();
  });

  it('should render all items', () => {
    const { getAllByTestId } = render(
      <List
        items={data}
        itemProps={{
          propMapping: {
            primary: 'title',
            secondary: 'content',
          },
        }}
      />
    );

    expect(getAllByTestId('ListItem')).toHaveLength(data.length);
  });

  it('should render item indicators', () => {
    const onItemIndicatorClick = jest.fn();

    const { baseElement } = render(
      <List
        items={data}
        itemIndicator={<button>O</button>}
        itemProps={{
          propMapping: {
            primary: 'title',
            secondary: 'content',
          },
        }}
        onItemIndicatorClick={onItemIndicatorClick}
      />
    );

    const buttons = baseElement.querySelectorAll('button');

    buttons.forEach((btn, i) => {
      btn.click();
      expect(onItemIndicatorClick).toHaveBeenNthCalledWith(i + 1, data[i]);
    });

    expect(buttons).toHaveLength(data.length);
    expect(onItemIndicatorClick).toHaveBeenCalledTimes(data.length);
  });

  it('should render item actions', () => {
    const onItemActionClick = jest.fn();

    const { baseElement } = render(
      <List
        items={data}
        itemAction={<button>Click me</button>}
        itemProps={{
          propMapping: {
            primary: 'title',
            secondary: 'content',
          },
        }}
        onItemActionClick={onItemActionClick}
      />
    );

    const buttons = baseElement.querySelectorAll('button');

    buttons.forEach((btn, i) => {
      btn.click();
      expect(onItemActionClick).toHaveBeenNthCalledWith(i + 1, data[i]);
    });

    expect(buttons).toHaveLength(data.length);
    expect(onItemActionClick).toHaveBeenCalledTimes(data.length);
  });

  const data = [
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
