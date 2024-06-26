import type { ReactNode } from 'react';

export type EditorListClasses = Record<'icon' | 'avatar' | 'subitem', string>;

export interface EditorListProps {
  description?: ReactNode;
  icon?: ReactNode;
  title: ReactNode;
  render: (classes: EditorListClasses) => ReactNode;
  onClose?: () => void;
}
