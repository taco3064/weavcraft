import type { PortalContainerEl } from '~web/contexts';

export type * from '~web/components';
export type * from '~web/contexts';
export type * from '~web/hooks';
export type * from '~web/services';
export type * from '~web/themes';

export interface BaseEditorProps<T> {
  config?: T;
  marginTop?: number;
  title: string;
  toolbarEl?: PortalContainerEl;
}
