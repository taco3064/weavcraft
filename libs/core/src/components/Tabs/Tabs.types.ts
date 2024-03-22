import MuiTab from '@mui/material/Tab';
import MuiTabs from '@mui/material/Tabs';
import type { ComponentProps, ReactNode } from 'react';
import type { Property } from 'csstype';

import type { IconCode } from '../Icon';
import type { WidgetWrapperProps } from '../../styles';

import type {
  GenericData,
  PrefixProps,
  PropsWithMappedData,
} from '../../contexts';

type MuiTabProps = Pick<
  ComponentProps<typeof MuiTab>,
  'disabled' | 'iconPosition' | 'label'
>;

type MuiTabsProps = Pick<
  ComponentProps<typeof MuiTabs>,
  'centered' | 'indicatorColor' | 'textColor'
>;

export type TabProps<D extends GenericData = {}> = PropsWithMappedData<
  D,
  Omit<MuiTabProps, 'iconPosition'> & {
    children?: ReactNode;
    icon?: IconCode;
  }
>;

export interface TabsProps
  extends MuiTabsProps,
    Pick<WidgetWrapperProps, 'maxWidth'>,
    PrefixProps<Pick<MuiTabProps, 'iconPosition'>, 'tab'> {
  height?: Property.Height;
  items?: TabProps[];
}
