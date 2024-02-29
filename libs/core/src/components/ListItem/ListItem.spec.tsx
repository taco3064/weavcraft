import MuiButton from '@mui/material/Button';
import MuiList from '@mui/material/List';
import { getByTestId, render } from '@testing-library/react';
import '@testing-library/jest-dom';

import Icon from '../Icon';
import ListItem from './ListItem';

describe('@weavcraft/ListItem', () => {
  it('should render item successfully', () => {
    const { baseElement } = render(
      <MuiList>
        <ListItem />
      </MuiList>
    );

    const el = getByTestId(baseElement, 'ListItem');

    expect(el).toBeTruthy();
  });

  it('should render button successfully', () => {
    const onItemClick = jest.fn();

    const { baseElement } = render(
      <MuiList>
        <ListItem variant="button" onItemClick={onItemClick} />
      </MuiList>
    );

    const el = getByTestId(baseElement, 'ListItemButton');

    el.click();
    expect(el).toBeTruthy();
    expect(onItemClick).toHaveBeenCalled();
  });

  it('should render link successfully', () => {
    const { baseElement } = render(
      <MuiList>
        <ListItem variant="link" href={data.url} />
      </MuiList>
    );

    const el = getByTestId(baseElement, 'ListItemLink');

    expect(el).toBeTruthy();
    expect(el).toHaveAttribute('href', data.url);
  });

  it('should render text', () => {
    const { baseElement } = render(
      <MuiList>
        <ListItem primary={data.title} secondary={data.content} />
      </MuiList>
    );

    const text = getByTestId(baseElement, 'ListItemText');
    const primary = text.querySelector('.primary');
    const secondary = text.querySelector('.secondary');

    expect(text).toBeTruthy();
    expect(primary).toHaveTextContent(data.title);
    expect(secondary).toHaveTextContent(data.content);
  });

  it('should render indicator', () => {
    const { baseElement } = render(
      <MuiList>
        <ListItem indicator={<Icon code="faGithub" />} />
      </MuiList>
    );

    const el = getByTestId(baseElement, 'Icon_faGithub');

    expect(el).toBeTruthy();
    expect(el.tagName).toBe('svg');
  });

  it('should render action', () => {
    const { baseElement } = render(
      <MuiList>
        <ListItem action={<MuiButton>Click Me</MuiButton>} />
      </MuiList>
    );

    const el = getByTestId(baseElement, 'ListItemAction');
    const buttons = baseElement.querySelectorAll('button');

    expect(el).toBeTruthy();
    expect(buttons).toHaveLength(1);
  });

  it('should correctly render item with data', () => {
    const { baseElement } = render(
      <MuiList>
        <ListItem
          data={data}
          propMapping={{
            primary: 'title',
            secondary: 'content',
          }}
        />
      </MuiList>
    );

    const el = getByTestId(baseElement, 'ListItem');
    const text = getByTestId(baseElement, 'ListItemText');
    const primary = text.querySelector('.primary');
    const secondary = text.querySelector('.secondary');

    expect(el).toBeTruthy();
    expect(text).toBeTruthy();
    expect(primary).toHaveTextContent(data.title);
    expect(secondary).toHaveTextContent(data.content);
  });

  it('should correctly render button with data', () => {
    const onItemClick = jest.fn();

    const { baseElement } = render(
      <MuiList>
        <ListItem
          variant="button"
          data={data}
          onItemClick={onItemClick}
          propMapping={{
            primary: 'title',
            secondary: 'content',
          }}
        />
      </MuiList>
    );

    const el = getByTestId(baseElement, 'ListItemButton');
    const text = getByTestId(baseElement, 'ListItemText');
    const primary = text.querySelector('.primary');
    const secondary = text.querySelector('.secondary');

    el.click();
    expect(text).toBeTruthy();
    expect(primary).toHaveTextContent(data.title);
    expect(secondary).toHaveTextContent(data.content);
    expect(onItemClick).toHaveBeenCalledWith(data);
  });

  it('should correctly render link with data', () => {
    const { baseElement } = render(
      <MuiList>
        <ListItem
          variant="link"
          data={data}
          propMapping={{
            primary: 'title',
            secondary: 'content',
            href: 'url',
          }}
        />
      </MuiList>
    );

    const el = getByTestId(baseElement, 'ListItemLink');
    const text = getByTestId(baseElement, 'ListItemText');
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
