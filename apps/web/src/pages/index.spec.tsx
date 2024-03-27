import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import IndexPage from './index.page';

describe('web/pages/IndexPage', () => {
  it('render without crashing', () => {
    const { baseElement } = render(<IndexPage />);

    expect(baseElement).toBeInTheDocument();
  });
});
