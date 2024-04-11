import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import ImageListItem from '@mui/material/ImageListItem';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { Display } from '@weavcraft/core';
import { useTranslation } from 'next-i18next';

import { ConfirmToggle, Link } from '~web/components';
import { useDraggable, useDroppable } from './HierarchyList.hooks';
import { useItemStyles } from './HierarchyList.styles';
import { useTutorialMode } from '~web/contexts';
import type { HierarchyListItemProps } from './HierarchyList.types';

export default function HierarchyListItem<P>({
  PreviewComponent,
  cols,
  data,
  disableDrag = false,
  icon,
  selected = false,
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
  const isGroup = data.type === 'group';

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
            href: `/${data.category}/${
              isGroup ? data._id : `detail/${data._id}`
            }${isTutorialMode ? '?tutorial' : ''}`,
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
              <Display.Icon
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

        {PreviewComponent &&
          data.type === 'item' &&
          data.payload &&
          !isDragging && <PreviewComponent payload={data.payload} />}

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
                  <Display.Icon code="faEdit" />
                </IconButton>
              </Tooltip>
            )}

            {onDeleteConfirm && (
              <ConfirmToggle
                subject={t('ttl-delete-confirm')}
                message={t('msg-delete-confirm', { name: data.title })}
                onConfirm={() => onDeleteConfirm(data)}
                toggle={
                  <Tooltip title={t('btn-delete')}>
                    <IconButton color="primary">
                      <Display.Icon code="faTrash" />
                    </IconButton>
                  </Tooltip>
                }
              />
            )}

            {!onPublishClick || isGroup ? null : (
              <Tooltip title={t('btn-publish')}>
                <span>
                  <IconButton
                    color="success"
                    disabled={isTutorialMode}
                    onClick={() => onPublishClick(data)}
                  >
                    <Display.Icon code="faShare" />
                  </IconButton>
                </span>
              </Tooltip>
            )}
          </CardActions>
        )}
      </Card>
    </ImageListItem>
  );
}
