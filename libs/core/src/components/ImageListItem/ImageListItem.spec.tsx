import MuiImageList from '@mui/material/ImageList';
import { getByTestId, render } from '@testing-library/react';
import '@testing-library/jest-dom';

import ImageListItem from './ImageListItem';

describe('@weavcraft/components/ImageListItem', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <MuiImageList>
        <ImageListItem />
      </MuiImageList>
    );

    expect(baseElement).toBeTruthy();
  });

  it('should render an image', () => {
    const { baseElement } = render(
      <MuiImageList>
        <ImageListItem src={data.img} />
      </MuiImageList>
    );

    const el = baseElement.querySelector('img');

    expect(el).toHaveAttribute('src', data.img);
  });

  it('should correctly apply the cols/rows prop', () => {
    const { baseElement } = render(
      <MuiImageList>
        <ImageListItem cols={data.cols} rows={data.rows} src={data.img} />
      </MuiImageList>
    );

    const el = getByTestId(baseElement, 'ImageListItem');

    expect(el).toHaveStyle(`grid-column-end: span ${data.cols};`);
    expect(el).toHaveStyle(`grid-row-end: span ${data.rows};`);
  });

  it('should render action icon by title', () => {
    const { baseElement } = render(
      <MuiImageList>
        <ImageListItem title={data.title} src={data.img} />
      </MuiImageList>
    );

    const el = getByTestId(baseElement, 'ImageListItemBar');

    expect(el).toBeTruthy();
  });

  it('should render action icon by description', () => {
    const { baseElement } = render(
      <MuiImageList>
        <ImageListItem description={data.author} src={data.img} />
      </MuiImageList>
    );

    const el = getByTestId(baseElement, 'ImageListItemBar');

    expect(el).toBeTruthy();
  });

  it('should render action icon by actionIcon', () => {
    const { baseElement } = render(
      <MuiImageList>
        <ImageListItem action={<div />} src={data.img} />
      </MuiImageList>
    );

    const el = getByTestId(baseElement, 'ImageListItemBar');

    expect(el).toBeTruthy();
  });

  it('should correctly render with data', () => {
    const { baseElement } = render(
      <MuiImageList>
        <ImageListItem
          data={data}
          propMapping={{
            src: 'img',
            title: 'title',
            description: 'author',
          }}
        />
      </MuiImageList>
    );

    const el = getByTestId(baseElement, 'ImageListItem');

    expect(el).toBeTruthy();
  });

  const data = {
    img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
    title: 'Breakfast',
    author: '@bkristastucchio',
    rows: 2,
    cols: 2,
  };
});
