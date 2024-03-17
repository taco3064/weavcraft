import MuiTab from '@mui/material/Tab';
import MuiTabs from '@mui/material/Tabs';
import type { ComponentProps, ReactNode } from 'react';
import type { Property } from 'csstype';

import type { ContainerProps } from '../Container';
import type { IconCode } from '../Icon';

import type {
  GenericData,
  PropsWithMappedData,
  PropsWithStore,
} from '../../contexts';

type MuiTabProps = Pick<
  ComponentProps<typeof MuiTab>,
  'disabled' | 'iconPosition' | 'label'
>;

type MuiTabsProps = Pick<
  ComponentProps<typeof MuiTabs>,
  'centered' | 'indicatorColor' | 'textColor'
>;

export type TabProps<D extends GenericData> = PropsWithMappedData<
  D,
  MuiTabProps & {
    icon?: IconCode;
  },
  'disabled' | 'icon' | 'label'
>;

export type TabsProps<D extends GenericData = {}> = PropsWithStore<
  D,
  MuiTabsProps & {
    children?: ReactNode;
    height?: Property.Height;
    maxWidth?: ContainerProps<D>['maxWidth'];
    itemProps?: Pick<TabProps<D>, 'iconPosition' | 'propMapping'>;
  }
>;
