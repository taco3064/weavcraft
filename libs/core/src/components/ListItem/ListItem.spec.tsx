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

  it('should render nested items correctly', () => {
    const { getByTestId } = renderWithList(
      <ListItem nestedContent={<div>Nested Content</div>} />
    );

    const el = getByTestId('ListItem');
    const nestedEl = getByTestId('ListItemNested');

    expect(el).toBeTruthy();
    expect(nestedEl).toBeTruthy();
    expect(nestedEl).toHaveTextContent('Nested Content');
  });

  it('should assign id correctly', () => {
    const { getByTestId } = renderWithList(<ListItem id="testNestedId" />);

    const el = getByTestId('ListItem');
    const nestedEl = getByTestId('ListItemNested');

    expect(el).toBeTruthy();
    expect(nestedEl).toBeTruthy();
    expect(nestedEl).toHaveAttribute('id', 'testNestedId');
  });

  const data = {
    title: 'Brunch this weekend?',
    url: 'https://weavcraft.io',
    content:
      'I will be in your neighborhood doing errands this weekend. Do you want to grab brunch?',
  };
});
