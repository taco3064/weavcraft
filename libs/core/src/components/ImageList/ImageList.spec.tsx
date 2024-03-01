import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import ImageList from './ImageList';

describe('@weavcraft/components/ImageList', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ImageList />);

    expect(baseElement).toBeTruthy();
  });

  it('should render all images', () => {
    const { baseElement, getAllByTestId } = render(
      <ImageList
        items={data}
        itemProps={{
          propMapping: {
            cols: 'cols',
            rows: 'rows',
            src: 'img',
            title: 'title',
          },
        }}
      />
    );

    const img1st = getAllByTestId('ImageListItem')[0];
    const imgs = baseElement.querySelectorAll('img');

    expect(imgs).toHaveLength(data.length);
    expect(img1st).toHaveStyle(`grid-column-end: span ${data[0].cols};`);
    expect(img1st).toHaveStyle(`grid-row-end: span ${data[0].rows};`);
  });

  it('should render action icons with onItemActionClick', () => {
    const onItemActionClick = jest.fn();

    const { baseElement } = render(
      <ImageList
        items={data}
        onItemActionClick={onItemActionClick}
        itemAction={
          <button {...{ propMapping: { children: 'title' } as never }}>
            Click me
          </button>
        }
        itemProps={{
          propMapping: {
            src: 'img',
            title: 'title',
          },
        }}
      />
    );

    const buttons = baseElement.querySelectorAll('button');

    buttons.forEach((btn, i) => {
      btn.click();
      expect(onItemActionClick).toHaveBeenNthCalledWith(i + 1, data[i]);
      expect(btn).toHaveTextContent(data[i].title);
    });

    expect(buttons).toHaveLength(data.length);
    expect(onItemActionClick).toHaveBeenCalledTimes(data.length);
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
