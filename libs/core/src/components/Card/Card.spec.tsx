import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import Card from './Card';

describe('@weavcraft/core/components/Card', () => {
  it('renders successfully', () => {
    const { getByTestId, queryByTestId } = render(<Card />);

    expect(getByTestId('Card')).toBeInTheDocument();
    expect(queryByTestId('CardHeader')).not.toBeInTheDocument();
    expect(queryByTestId('CardMedia')).not.toBeInTheDocument();
    expect(queryByTestId('CardContent')).not.toBeInTheDocument();
    expect(queryByTestId('CardActions')).not.toBeInTheDocument();
  });

  it('renders media when mediaSrc and mediaType are provided', () => {
    const { getByTestId } = render(
      <Card mediaSrc="test.jpg" mediaType="img" />
    );

    expect(getByTestId('CardMedia')).toBeInTheDocument();
  });

  it('does not render media when mediaSrc or mediaType are not provided', () => {
    const { queryByTestId } = render(
      <>
        <Card mediaSrc="test.jpg" />
        <Card mediaType="img" />
      </>
    );

    expect(queryByTestId('CardMedia')).not.toBeInTheDocument();
  });

  it('renders header when avatar, description, headerAction, or title are provided', () => {
    const { getAllByTestId, getByTestId, getByText } = render(
      <>
        <Card avatar={<div data-testid="avatar" />} />
        <Card headerAction={<div data-testid="action" />} />
        <Card title="title" />
        <Card description="description" />
      </>
    );

    expect(getAllByTestId('CardHeader')).toHaveLength(4);
    expect(getByTestId('avatar')).toBeInTheDocument();
    expect(getByTestId('action')).toBeInTheDocument();
    expect(getByText('title')).toBeInTheDocument();
    expect(getByText('description')).toBeInTheDocument();
  });

  it('renders children when provided', () => {
    const { getByTestId } = render(<Card>{<div data-testid="child" />}</Card>);

    expect(getByTestId('child')).toBeInTheDocument();
  });

  it('renders footerAction when provided', () => {
    const { getByTestId } = render(
      <Card footerAction={<div data-testid="footer" />} />
    );

    expect(getByTestId('footer')).toBeInTheDocument();
  });
});
