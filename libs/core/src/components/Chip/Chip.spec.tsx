import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import Chip from './Chip';

describe('Chip', () => {
  it('should render successfully', () => {
    const { getByTestId } = render(<Chip />);

    expect(getByTestId('Chip')).toBeTruthy();
  });

  it('should call onDelete when the chip is deleted', () => {
    const onDelete = jest.fn();
    const { getByTestId } = render(<Chip onDelete={onDelete} />);

    fireEvent.click(getByTestId('CancelIcon'));
    expect(onDelete).toHaveBeenCalledWith(undefined);
  });

  it('should call onDelete with the correct data when deleted', () => {
    const data = { name: 'Tom' };
    const onDelete = jest.fn();
    const { getByTestId } = render(<Chip data={data} onDelete={onDelete} />);

    fireEvent.click(getByTestId('CancelIcon'));
    expect(onDelete).toHaveBeenCalledWith(data);
  });

  it('should call onClick data when clicked', () => {
    const onClick = jest.fn();
    const { getByTestId } = render(<Chip onClick={onClick} />);
    const chip = getByTestId('Chip');

    expect(chip).toHaveClass('MuiChip-clickable');
    expect(chip).toHaveStyle('cursor: pointer');

    fireEvent.click(getByTestId('Chip'));
    expect(onClick).toHaveBeenCalledWith(undefined);
  });

  it('should call onClick with the correct data when clicked', () => {
    const data = { name: 'Tom' };
    const onClick = jest.fn();
    const { getByTestId } = render(<Chip data={data} onClick={onClick} />);

    fireEvent.click(getByTestId('Chip'));
    expect(onClick).toHaveBeenCalledWith(data);
  });
});
