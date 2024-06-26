import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Checkbox from '@mui/material/Checkbox';
import Core from '@weavcraft/core';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ImageListItem from '@mui/material/ImageListItem';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'next-i18next';

import { ConfirmToggle, Link } from '~web/components';
import { EnumHierarchyType } from '~web/services';
import { useDraggable, useDroppable } from './HierarchyList.hooks';
import { useItemStyles } from './HierarchyList.styles';
import { useTutorialMode } from '~web/contexts';
import type { HierarchyListItemProps } from './HierarchyList.types';

export default function HierarchyListItem<P>({
  cols,
  data,
  disableDrag = false,
  icon,
  selected = false,
  renderPreview,
  onDeleteConfirm,
  onEditClick,
  onPublishClick,
  onSelect,
}: HierarchyListItemProps<P>) {
  const { t } = useTranslation();
  const { dragRef, isDragging, dragProps } = useDraggable(data, disableDrag);
  const { dropRef, isDropOver } = useDroppable(data, disableDrag);
  const { classes } = useItemStyles({ cols, isDragging, isDropOver });
  const { style, ...toggleProps } = dragProps;

  const isTutorialMode = useTutorialMode();
  const isGroup = data.type === EnumHierarchyType.GROUP;

  const editTitle = isGroup
    ? t('btn-edit-group')
    : t('btn-edit-item', {
        category: t(`ttl-breadcrumbs.${data.category}.label`),
      });

  return (
    <ImageListItem ref={dropRef}>
      <Card className={classes.card} style={style}>
        <CardHeader
          title={data.title}
          titleTypographyProps={{
            variant: 'subtitle2',
            color: 'text.primary',
            component: Link,
            href: `${isTutorialMode ? '/tutorial' : ''}/${data.category}/${
              isGroup ? data.id : `detail/${data.id}`
            }`,
          }}
          action={
            !onSelect ? null : (
              <Checkbox
                size="large"
                checked={selected}
                color="secondary"
                onChange={(e) => onSelect(e.target.checked, data)}
              />
            )
          }
          avatar={
            <Avatar
              ref={dragRef}
              className={classes.dndToggle}
              {...toggleProps}
            >
              <Core.Icon
                {...(!isGroup
                  ? { code: icon, color: 'success' }
                  : {
                      code: isDropOver ? 'faFolderOpen' : 'faFolder',
                      color: 'warning',
                    })}
              />
            </Avatar>
          }
        />

        {data.type === EnumHierarchyType.ITEM &&
          !isDragging &&
          renderPreview?.(data.payload)}

        {data.description && (
          <CardContent>
            <Typography
              role="textbox"
              variant="body2"
              color="text.secondary"
              whiteSpace="pre-line"
              className={classes.description}
            >
              {data.description}
            </Typography>
          </CardContent>
        )}

        {!isDragging && (
          <>
            <Divider />

            <CardActions>
              {onEditClick && (
                <Tooltip title={editTitle}>
                  <IconButton
                    color="primary"
                    onClick={() =>
                      onEditClick({
                        data,
                        icon: isGroup ? 'faFolder' : icon,
                        title: editTitle,
                      })
                    }
                  >
                    <Core.Icon code="faEdit" />
                  </IconButton>
                </Tooltip>
              )}

              {onDeleteConfirm && (
                <ConfirmToggle
                  subject={t('ttl-delete-confirm')}
                  onConfirm={() => onDeleteConfirm(data)}
                  message={t(
                    isGroup
                      ? 'msg-delete-hierarchy-group-confirm'
                      : 'msg-delete-confirm',
                    { name: data.title }
                  )}
                  toggle={
                    <Tooltip title={t('btn-delete')}>
                      <IconButton color="primary">
                        <Core.Icon code="faTrash" />
                      </IconButton>
                    </Tooltip>
                  }
                />
              )}

              {!onPublishClick || isGroup ? null : (
                <Tooltip title={t('btn-publish')}>
                  <IconButton
                    color="success"
                    onClick={() => onPublishClick(data)}
                  >
                    <Core.Icon code="faShare" />
                  </IconButton>
                </Tooltip>
              )}
            </CardActions>
          </>
        )}
      </Card>
    </ImageListItem>
  );
}
