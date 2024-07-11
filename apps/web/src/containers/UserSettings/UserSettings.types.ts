import type Core from '@weavcraft/core';

export type UserSettingId = 'profile' | 'settings' | 'analytics';

export type UserSettings = {
  auth: boolean;
  id: UserSettingId;
  icon: Core.IconCode;
}[];
