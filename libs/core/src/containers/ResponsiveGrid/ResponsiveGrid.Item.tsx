import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Container from '@mui/material/Container';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import IconButton from '@mui/material/IconButton';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import Toolbar from '@mui/material/Toolbar';
import { useDndContext, useDraggable } from '@dnd-kit/core';
import { useSortable } from '@dnd-kit/sortable';

import { useBreakpointMatches } from '../../hooks';
import { useItemStyles } from './ResponsiveGrid.styles';
import type { GridItemProps } from './ResponsiveGrid.types';

export default function GridItem({
  GridProps,
  id,
  actions,
  children,
  className,
  disableToolbar = false,
  enableResize = false,
  enableResort = false,
  spans,
}: GridItemProps) {
  const { active } = useDndContext();
  const sortable = useSortable({ id, disabled: !enableResort });

  const resizable = useDraggable({
    id: `resize-${id}`,
    disabled: !enableResize,
  });

  const { matched: span } = useBreakpointMatches(spans, GridProps.breakpoint);

  const { classes, cx } = useItemStyles({
    ...sortable,
    GridProps,
    activeId: active?.id.toString().replace('resize-', ''),
    id,
    span,
  });

  return (
    <ImageListItem
      {...span}
      ref={sortable.setNodeRef}
      className={classes.root}
      id={id}
    >
      <Container
        disableGutters
        maxWidth={false}
        className={cx(classes.content, className)}
      >
        {children}
      </Container>

      {!disableToolbar && (actions || enableResize || enableResort) && (
        <ImageListItemBar
          classes={{ root: classes.bar, titleWrap: classes.barTitle }}
          title={
            <Toolbar role="toolbar" variant="dense">
              {enableResort && (
                <IconButton
                  {...sortable.attributes}
                  {...sortable.listeners}
                  className={classes.dndToggle}
                >
                  <DragIndicatorIcon />
                </IconButton>
              )}

              {actions}
            </Toolbar>
          }
          actionIcon={
            enableResize && (
              <ArrowForwardIosIcon
                ref={resizable.setNodeRef as never}
                className={classes.resizeToggle}
                {...resizable.attributes}
                {...resizable.listeners}
              />
            )
          }
        />
      )}
    </ImageListItem>
  );
}
