import { render } from '@testing-library/react';
import type { JsonObject } from 'type-fest';
import type { ReactNode } from 'react';
import '@testing-library/jest-dom';

import { useStoreProps } from './useStoreProps';
import type { PropsWithMappedStore } from './useStoreProps.types';

import {
  useGenerateProps,
  type PropsWithMappedData,
} from '../useGenerateProps';

describe('makeStoreProps', () => {
  it('should pass correct props', () => {
    const { getByTestId } = render(<Dummies records={records} />);
    const spans = getByTestId('dummies').querySelectorAll('span');

    expect(spans).toHaveLength(records.length);

    spans.forEach((span, i) => {
      expect(span).toHaveTextContent(records[i].name);
    });
  });

  it('should pass correct records with propMapping', () => {
    const { getByTestId } = render(
      <Dummy data={{ override: records }}>
        <Dummies propMapping={{ records: 'override' }} />
      </Dummy>
    );

    expect(getByTestId('dummies').querySelectorAll('span')).toHaveLength(
      records.length
    );
  });

  it('should override props by data value', () => {
    const override = [...records, { name: 'John Doe' }];

    const { getByTestId } = render(
      <Dummy data={{ override }}>
        <Dummies records={records} propMapping={{ records: 'override' }} />
      </Dummy>
    );

    expect(getByTestId('dummies').querySelectorAll('span')).toHaveLength(
      records.length + 1
    );
  });

  function Dummy<D extends JsonObject>(
    props: PropsWithMappedData<D, { children?: ReactNode }>
  ) {
    const [GeneratePropsProvider, { children }] = useGenerateProps<
      D,
      typeof props
    >(props);

    return (
      <GeneratePropsProvider>
        <div data-testid="dummy">{children}</div>
      </GeneratePropsProvider>
    );
  }

  function Dummies(props: PropsWithMappedStore<{ name: string }>) {
    const { records } = useStoreProps(props);

    return (
      <div data-testid="dummies">
        {records?.map(({ name }, i) => (
          <span key={i}>{name}</span>
        ))}
      </div>
    );
  }

  const records = [{ name: 'Tom White' }, { name: 'Johnny Smith' }];
});
