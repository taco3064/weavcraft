import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import Slider from './Slider';

describe('@weavcraft/core/components/Slider', () => {
  it('should render successfully', () => {
    const { getByTestId } = render(<Slider />);

    expect(getByTestId('Slider')).toBeTruthy();
  });
});
