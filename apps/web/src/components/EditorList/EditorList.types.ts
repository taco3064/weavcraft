import type { ReactNode } from 'react';

export type EditorListClasses = Record<'icon' | 'avatar' | 'subitem', string>;

export interface EditorListProps {
  className?: string;
  description?: ReactNode;
  icon?: ReactNode;
  title: ReactNode;
  render: (classes: EditorListClasses) => ReactNode;
  renderCloseButton?: (options: Pick<EditorListProps, 'onClose'>) => ReactNode;
  onClose?: () => void;
}
