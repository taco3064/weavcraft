import MuiTab from '@mui/material/Tab';
import MuiTabs from '@mui/material/Tabs';
import type { ComponentProps, ReactNode } from 'react';
import type { JsonObject } from 'type-fest';
import type { Property } from 'csstype';

import type { IconCode } from '../Icon';
import type { PrefixProps, PropsWithMappedData } from '../../hooks';
import type { WidgetWrapperProps } from '../../styles';

type MuiTabProps = Pick<
  ComponentProps<typeof MuiTab>,
  'disabled' | 'iconPosition' | 'label'
>;

type MuiTabsProps = Pick<
  ComponentProps<typeof MuiTabs>,
  'centered' | 'indicatorColor' | 'textColor'
>;

export type TabProps<D extends JsonObject = {}> = PropsWithMappedData<
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
