import IconButton from '@mui/material/IconButton';
import { getByTestId, render } from '@testing-library/react';
import '@testing-library/jest-dom';

import Icon from '../Icon';
import List from './List';

describe('@weavcraft/ImageList', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<List />);

    expect(baseElement).toBeTruthy();
  });

  it('should render subheader', () => {
    const { baseElement } = render(
      <List
        data={data}
        subheaderProps={{
          title: 'Inbox',
          icon: { code: 'faGithub', color: 'primary' },
          action: (
            <IconButton data-testid="action" edge="end">
              <Icon code="faPlus" />
            </IconButton>
          ),
        }}
      />
    );

    const subheader = getByTestId(baseElement, 'subheader');
    const icon = getByTestId(baseElement, 'faGithub');
    const action = subheader.lastElementChild?.querySelector('button');

    expect(subheader).toBeTruthy();
    expect(icon).toBeTruthy();
    expect(action).toBeTruthy();
    expect(icon.tagName).toBe('svg');
    expect(action?.firstElementChild?.tagName).toBe('svg');
    expect(subheader.firstChild).toHaveTextContent('Inbox');
  });

  it('should render all data', () => {
    const { baseElement } = render(
      <List
        data={data}
        propMapping={{
          primary: 'title',
          secondary: 'content',
        }}
      />
    );

    const items = baseElement.querySelectorAll('li');
    const titles = baseElement.querySelectorAll('.primary');
    const descriptions = baseElement.querySelectorAll('.secondary');

    expect(items.length).toBe(data.length);
    expect(titles.length).toBe(data.length);
    expect(descriptions.length).toBe(data.length);
  });

  it('should correctly apply the item variant prop', () => {
    const { baseElement } = render(
      <List
        data={data}
        itemProps={{ variant: 'button' }}
        propMapping={{
          primary: 'title',
          secondary: 'content',
          href: 'url',
        }}
      />
    );

    const links = baseElement.querySelectorAll('a');

    expect(links.length).toBe(data.length);
  });

  it('should render icon indicator', () => {
    const { baseElement } = render(
      <List
        data={data}
        indicatorProps={{
          variant: 'icon',
          code: 'faGithub',
        }}
      />
    );

    const indicators = baseElement.querySelectorAll('svg');

    expect(indicators.length).toBe(data.length);
  });

  it('should render avatar indicator', () => {
    const { baseElement } = render(
      <List
        data={data}
        indicatorProps={{
          variant: 'avatar',
          src: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
        }}
      />
    );

    const indicators = baseElement.querySelectorAll('img');

    expect(indicators.length).toBe(data.length);
  });

  it('should render icon with propMapping prop', () => {
    const { baseElement } = render(
      <List
        data={data}
        propMapping={{
          primary: 'title',
          secondary: 'content',
          code: 'icon',
        }}
      />
    );

    const icons = baseElement.querySelectorAll('svg');

    expect(icons.length).toBe(data.length);
  });

  it('should render avatar with propMapping prop', () => {
    const { baseElement } = render(
      <List
        data={data}
        indicatorProps={{ variant: 'avatar' }}
        propMapping={{
          primary: 'title',
          secondary: 'content',
          src: 'url',
        }}
      />
    );

    const avatars = baseElement.querySelectorAll('img');

    expect(avatars.length).toBe(data.length);
  });

  it('should render all actions', () => {
    const { baseElement } = render(
      <List
        data={data}
        itemProps={{ variant: 'item' }}
        propMapping={{ primary: 'title', secondary: 'content' }}
        itemAction={<Icon code="faClose" />}
      />
    );

    const actions = baseElement.querySelectorAll('svg[data-testid="faClose"]');

    expect(actions.length).toBe(data.length);
  });

  it('should call onItemToggle', () => {
    const onItemToggle = jest.fn();

    const { baseElement } = render(
      <List
        data={data}
        itemProps={{ variant: 'button' }}
        propMapping={{ primary: 'title', secondary: 'content' }}
        onItemToggle={onItemToggle}
        itemAction={
          <IconButton>
            <Icon code="faClose" />
          </IconButton>
        }
      />
    );

    const btns = baseElement.querySelectorAll('button');

    btns.forEach((btn, i) => {
      btn.click();
      expect(onItemToggle).toHaveBeenNthCalledWith(i + 1, data[i]);
    });

    expect(onItemToggle).toHaveBeenCalledTimes(data.length);
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
