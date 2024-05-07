import { render } from '@testing-library/react';
import type { ReactNode } from 'react';
import type { JsonObject } from 'type-fest';
import '@testing-library/jest-dom';

import { useGenerateProps } from './useGenerateProps';
import type { PropsWithMappedData } from './useGenerateProps.types';

describe('@weavcraft/core/hooks/useGenerateProps', () => {
  it('should pass the correct props', () => {
    const value = 'Tom White';

    const { getByTestId } = render(
      <Dummy data={{ name: value }} propMapping={{ title: 'name' }} />
    );

    expect(getByTestId('dummy')).toHaveTextContent(value);
  });

  it('should pass the original props', () => {
    const value = 'Johnny Smith';

    const { getByTestId } = render(
      <Dummy
        title={value}
        data={{ name: 'Tom White' }}
        propMapping={{ title: 'name' }}
      />
    );

    expect(getByTestId('dummy')).toHaveTextContent(value);
  });

  it('should useGenerateProps works correctly in nested structure', () => {
    const value = 'White';

    const { getByText } = render(
      <Dummy
        data={{ firstName: 'Tom', lastName: value }}
        propMapping={{ title: 'firstName' }}
      >
        <Dummy propMapping={{ title: 'lastName' }} />
      </Dummy>
    );

    expect(getByText(value)).toBeTruthy();
  });

  function Dummy<D extends JsonObject>(
    props: PropsWithMappedData<D, { title?: string; children?: ReactNode }>
  ) {
    const [GeneratePropsProvider, { title, children }] = useGenerateProps<
      D,
      typeof props
    >(props);

    return (
      <GeneratePropsProvider>
        <div data-testid="dummy">
          {title}
          {children}
        </div>
      </GeneratePropsProvider>
    );
  }
});
