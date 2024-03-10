import MuiList from '@mui/material/List';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import Icon from '../Icon';
import ListItem from './ListItem';

function renderWithList(...args: Parameters<typeof render>) {
  return render(<MuiList>{args[0]}</MuiList>, args[1]);
}

describe('@weavcraft/core/components/ListItem', () => {
  it('should render item successfully', () => {
    const { getByTestId } = renderWithList(<ListItem />);

    expect(getByTestId('ListItem')).toBeTruthy();
  });

  it('should render button successfully', () => {
    const onItemClick = jest.fn();

    const { getByTestId } = renderWithList(
      <ListItem variant="button" onItemClick={onItemClick} />
    );

    const el = getByTestId('ListItemButton');

    el.click();
    expect(el).toBeTruthy();
    expect(onItemClick).toHaveBeenCalled();
  });

  it('should render link successfully', () => {
    const { getByTestId } = renderWithList(
      <ListItem variant="link" href={data.url} />
    );

    const el = getByTestId('ListItemLink');

    expect(el).toBeTruthy();
    expect(el).toHaveAttribute('href', data.url);
  });

  it('should render text', () => {
    const { getByTestId } = renderWithList(
      <ListItem primary={data.title} secondary={data.content} />
    );

    const text = getByTestId('ListItemText');
    const primary = text.querySelector('.primary');
    const secondary = text.querySelector('.secondary');

    expect(text).toBeTruthy();
    expect(primary).toHaveTextContent(data.title);
    expect(secondary).toHaveTextContent(data.content);
  });

  it('should render indicator', () => {
    const { getByTestId } = renderWithList(
      <ListItem indicator={<Icon code="faGithub" />} />
    );

    const el = getByTestId('Icon_faGithub');

    expect(el).toBeTruthy();
    expect(el.tagName).toBe('svg');
  });

  it('should render action', () => {
    const { getByTestId } = renderWithList(
      <ListItem action={<button>Click Me</button>} />
    );

    const el = getByTestId('ListItemAction');
    const buttons = el.querySelectorAll('button');

    expect(el).toBeTruthy();
    expect(buttons).toHaveLength(1);
  });

  it('should correctly render item with data', () => {
    const { getByTestId } = renderWithList(
      <ListItem
        data={data}
        propMapping={{
          primary: 'title',
          secondary: 'content',
        }}
      />
    );

    const el = getByTestId('ListItem');
    const text = getByTestId('ListItemText');
    const primary = text.querySelector('.primary');
    const secondary = text.querySelector('.secondary');

    expect(el).toBeTruthy();
    expect(text).toBeTruthy();
    expect(primary).toHaveTextContent(data.title);
    expect(secondary).toHaveTextContent(data.content);
  });

  it('should correctly render button with data', () => {
    const onItemClick = jest.fn();

    const { getByTestId } = renderWithList(
      <ListItem
        variant="button"
        data={data}
        onItemClick={onItemClick}
        propMapping={{
          primary: 'title',
          secondary: 'content',
        }}
      />
    );

    const el = getByTestId('ListItemButton');
    const text = getByTestId('ListItemText');
    const primary = text.querySelector('.primary');
    const secondary = text.querySelector('.secondary');

    el.click();
    expect(text).toBeTruthy();
    expect(primary).toHaveTextContent(data.title);
    expect(secondary).toHaveTextContent(data.content);
    expect(onItemClick).toHaveBeenCalledWith(data);
  });

  it('should correctly render link with data', () => {
    const { getByTestId } = renderWithList(
      <ListItem
        variant="link"
        data={data}
        propMapping={{
          primary: 'title',
          secondary: 'content',
          href: 'url',
        }}
      />
    );

    const el = getByTestId('ListItemLink');
    const text = getByTestId('ListItemText');
    const primary = text.querySelector('.primary');
    const secondary = text.querySelector('.secondary');

    expect(el).toBeTruthy();
    expect(text).toBeTruthy();
    expect(primary).toHaveTextContent(data.title);
    expect(secondary).toHaveTextContent(data.content);
    expect(el).toHaveAttribute('href', data.url);
  });

  const data = {
    title: 'Brunch this weekend?',
    url: 'https://weavcraft.io',
    content:
      'I will be in your neighborhood doing errands this weekend. Do you want to grab brunch?',
  };
});
