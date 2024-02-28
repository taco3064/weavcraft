import IconButton from '@mui/material/IconButton';
import { getByTestId, render } from '@testing-library/react';
import '@testing-library/jest-dom';

import Icon from '../Icon';
import ImageList from './ImageList';

describe('@weavcraft/ImageList', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ImageList />);

    expect(baseElement).toBeTruthy();
  });

  it('should render all images', () => {
    const { baseElement } = render(
      <ImageList
        data={data}
        propMapping={{
          alt: 'title',
          description: 'author',
          src: 'img',
        }}
      />
    );

    const imgs = baseElement.querySelectorAll('img');

    const titles = baseElement.querySelectorAll(
      'div.MuiImageListItemBar-title'
    );

    const descriptions = baseElement.querySelectorAll(
      'div.MuiImageListItemBar-subtitle'
    );

    expect(imgs.length).toBe(data.length);
    expect(titles.length).toBe(data.length);
    expect(descriptions.length).toBe(data.length);
  });

  it('should correctly apply the cols prop', () => {
    const { baseElement } = render(
      <ImageList
        data={data.slice(0, 2)}
        propMapping={{
          alt: 'title',
          src: 'img',
          rows: 'rows',
          cols: 'cols',
        }}
      />
    );

    const breakfast = getByTestId(baseElement, 'Breakfast');
    const burger = getByTestId(baseElement, 'Burger');

    expect(breakfast).toHaveStyle('grid-column-end: span 2;');
    expect(burger).toHaveStyle('grid-column-end: span 1;');
  });

  it('should correctly apply the rows prop', () => {
    const { baseElement } = render(
      <ImageList
        data={data.slice(0, 2)}
        propMapping={{
          alt: 'title',
          src: 'img',
          rows: 'rows',
          cols: 'cols',
        }}
      />
    );

    const breakfast = getByTestId(baseElement, 'Breakfast');
    const burger = getByTestId(baseElement, 'Burger');

    expect(breakfast).toHaveStyle('grid-row-end: span 2;');
    expect(burger).toHaveStyle('grid-row-end: span 1;');
  });

  it('should render all actions', () => {
    const { baseElement } = render(
      <ImageList
        data={data}
        itemProps={{ rows: 1, cols: 1 }}
        propMapping={{ src: 'img' }}
        itemAction={<Icon code="faClose" />}
      />
    );

    const actions = baseElement.querySelectorAll('svg[data-testid="faClose"]');

    expect(actions.length).toBe(data.length);
  });

  it('should call onItemToggle', () => {
    const onItemToggle = jest.fn();

    const { baseElement } = render(
      <ImageList
        data={data}
        itemProps={{ rows: 1, cols: 1 }}
        propMapping={{ src: 'img' }}
        itemAction={
          <IconButton>
            <Icon code="faClose" />
          </IconButton>
        }
        onItemToggle={onItemToggle}
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
      img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
      title: 'Breakfast',
      author: '@bkristastucchio',
      rows: 2,
      cols: 2,
      featured: true,
    },
    {
      img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
      title: 'Burger',
      author: '@rollelflex_graphy726',
    },
    {
      img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
      title: 'Camera',
      author: '@helloimnik',
    },
  ];
});
