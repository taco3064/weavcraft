import { getByTestId, render } from '@testing-library/react';
import Icon from './Icon';

describe('@weavcraft/Icon', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Icon code="faClose" />);
    const el = getByTestId(baseElement, 'Icon_faClose');

    expect(el).toBeTruthy();
    expect(el.tagName).toBe('svg');
  });

  it('should correctly render with data', () => {
    const { baseElement } = render(
      <Icon data={{ icon: 'faGithub' }} propMapping={{ code: 'icon' }} />
    );

    const el = getByTestId(baseElement, 'Icon_faGithub');

    expect(el).toBeTruthy();
    expect(el.tagName).toBe('svg');
  });
});
