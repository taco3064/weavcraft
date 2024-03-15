import MuiTab from '@mui/material/Tab';
import MuiTabs from '@mui/material/Tabs';
import { styled } from '@mui/material/styles';

import {
  Children,
  cloneElement,
  isValidElement,
  useEffect,
  useState,
} from 'react';

import Container from '../Container';
import Icon from '../Icon';
import type { TabProps, TabsProps } from './Tabs.types';

import {
  makeStoreProps,
  usePropsGetter,
  type GenericData,
} from '../../contexts';

const withStoreProps = makeStoreProps<TabsProps>();

const Frame = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  flexWrap: 'nowrap',

  '& > div[data-testid="Container"]': {
    height: '100%',
    overflow: 'hidden auto',
  },
});

export default withStoreProps(function Tabs<D extends GenericData>({
  children,
  contentMaxWidth,
  itemProps,
  records = [],
  ...props
}: TabsProps<D>) {
  const [active, setActive] = useState(0);

  const getProps = usePropsGetter<D>();
  const child = Children.toArray(children)[active];
  const data = records[active];

  useEffect(() => {
    if (active >= records.length) {
      setActive(0);
    }
  }, [active, records.length]);

  return (
    <Frame>
      <MuiTabs
        {...props}
        allowScrollButtonsMobile
        orientation="horizontal"
        scrollButtons="auto"
        variant="scrollable"
        data-testid="Tabs"
        value={active}
        onChange={(_e, value) => setActive(value)}
      >
        {records?.map((item, i) => {
          const { icon, ...tabProps } = getProps<TabProps<D>>({
            ...itemProps,
            data: item,
          });

          return (
            <MuiTab
              {...tabProps}
              data-testid="Tab"
              key={i}
              icon={<Icon />}
              value={i}
            />
          );
        })}
      </MuiTabs>

      {!data || !child ? null : (
        <Container data={data} maxWidth={contentMaxWidth}>
          {!isValidElement(child) ? null : cloneElement(child)}
        </Container>
      )}
    </Frame>
  );
});
