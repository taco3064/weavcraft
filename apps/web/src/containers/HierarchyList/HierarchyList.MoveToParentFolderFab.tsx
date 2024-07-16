import Core from '@weavcraft/core';
import Fab from '@mui/material/Fab';
import { useDndContext, useDroppable } from '@dnd-kit/core';

import type { MoveToParentFolderFabProps } from './HierarchyList.types';

export default function MoveToParentFolderFab({
  className,
  disabled,
  id,
}: MoveToParentFolderFabProps) {
  const { isOver, setNodeRef } = useDroppable({ id, disabled });
  const { active } = useDndContext();

  return disabled ? null : (
    <Fab
      ref={setNodeRef}
      className={className}
      color="warning"
      size="large"
      sx={{ opacity: !active || isOver ? 1 : 0.6 }}
    >
      <Core.Icon code="faArrowUpFromBracket" fontSize="large" />
    </Fab>
  );
}
