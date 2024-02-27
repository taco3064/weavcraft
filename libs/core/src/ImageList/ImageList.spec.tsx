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
    const size = 2;

    const { baseElement } = render(
      <ImageList
        data={data.slice(0, size)}
        itemProps={{ rows: 1, cols: 1 }}
        propMapping={{ src: 'img' }}
        action={<Icon code="faClose" />}
      />
    );

    const actions = baseElement.querySelectorAll('svg[data-testid="faClose"]');

    expect(actions.length).toBe(size);
  });

  it('should call onItemToggle', () => {
    const size = 2;
    const onItemToggle = jest.fn();

    const { baseElement } = render(
      <ImageList
        data={data.slice(0, size)}
        itemProps={{ rows: 1, cols: 1 }}
        propMapping={{ src: 'img' }}
        action={
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

    expect(onItemToggle).toHaveBeenCalledTimes(size);
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
    {
      img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
      title: 'Coffee',
      author: '@nolanissac',
      cols: 2,
    },
    {
      img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
      title: 'Hats',
      author: '@hjrc33',
      cols: 2,
    },
    {
      img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
      title: 'Honey',
      author: '@arwinneil',
      rows: 2,
      cols: 2,
      featured: true,
    },
    {
      img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
      title: 'Basketball',
      author: '@tjdragotta',
    },
    {
      img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
      title: 'Fern',
      author: '@katie_wasserman',
    },
    {
      img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
      title: 'Mushrooms',
      author: '@silverdalex',
      rows: 2,
      cols: 2,
    },
    {
      img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
      title: 'Tomato basil',
      author: '@shelleypauls',
    },
    {
      img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
      title: 'Sea star',
      author: '@peterlaster',
    },
    {
      img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
      title: 'Bike',
      author: '@southside_customs',
      cols: 2,
    },
  ];
});
