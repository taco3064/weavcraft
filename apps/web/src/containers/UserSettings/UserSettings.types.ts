import type Core from '@weavcraft/core';

export type UserSettingType = 'profile' | 'settings' | 'analytics';

export type UserSettings = {
  auth: boolean;
  id: UserSettingType;
  icon: Core.IconCode;
}[];

//* Component Props
export interface UserSettingsProps {
  type: UserSettingType;
}

export interface BaseSettingProps {
  className?: string;
  disabled?: boolean;
}
