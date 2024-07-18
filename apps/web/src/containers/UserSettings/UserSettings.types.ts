import type { UserSettingType } from '~web/hooks';

//* Component Props
export interface UserSettingsProps {
  type: UserSettingType;
}

export interface BaseSettingProps {
  className?: string;
  disabled?: boolean;
}
