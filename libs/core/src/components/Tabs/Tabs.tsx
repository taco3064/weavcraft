import MuiTab from '@mui/material/Tab';
import MuiTabs from '@mui/material/Tabs';

import {
  Children,
  cloneElement,
  isValidElement,
  useEffect,
  useState,
} from 'react';

import Container from '../Container';
import Icon from '../Icon';
import { WidgetWrapper } from '../../styles';
import { usePropsGetter } from '../../hooks';
import type { TabProps, TabsProps } from './Tabs.types';

export default function Tabs({
  maxWidth,
  height = '100vh',
  items,
  tabIconPosition,
  ...props
}: TabsProps) {
  const [active, setActive] = useState(0);
  const getProps = usePropsGetter();
  const children = items?.map(getProps<TabProps>);

  const activeChild = { ...children?.[active], data: items?.[active].data };

  useEffect(() => {
    setActive(0);
  }, [items?.length]);

  return (
    <WidgetWrapper
      {...{ height, maxWidth }}
      header={
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
          {children?.map(({ children: _c, icon, ...tabProps }, i) => (
            <MuiTab
              {...tabProps}
              data-testid="Tab"
              key={i}
              icon={!icon ? undefined : <Icon code={icon} />}
              value={i}
            />
          ))}
        </MuiTabs>
      }
    >
      {!activeChild ? null : (
        <Container maxWidth={false} data={activeChild.data}>
          {Children.map(activeChild.children, (child, i) =>
            !isValidElement(child) ? null : cloneElement(child, { key: i })
          )}
        </Container>
      )}
    </WidgetWrapper>
  );
}
