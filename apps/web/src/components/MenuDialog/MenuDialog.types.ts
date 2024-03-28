import type { ReactNode } from 'react';

export type MenuItem<P = {}> = P &
  (
    | 'divider'
    | {
        href?: string;
        indicator?: ReactNode;
        label: string;
      }
  );

export interface MenuDialogProps {
  indicator?: ReactNode;
  items: (null | false | undefined | MenuItem)[];
  open: boolean;
  title?: string;
  onClose: () => void;
  onItemClick?: (e: string) => void;
}
