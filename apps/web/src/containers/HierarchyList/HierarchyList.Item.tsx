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
import { Trans, useTranslation } from 'next-i18next';

import { ConfirmToggle, Link } from '~web/components';
import { useDraggable, useDroppable } from './HierarchyList.hooks';
import { useItemStyles } from './HierarchyList.styles';
import type { HierarchyListItemProps } from './HierarchyList.types';

export default function HierarchyListItem({
  cols,
  data,
  disableDrag = false,
  icon,
  selected = false,
  onDeleteConfirm,
  onEditClick,
  onPublishClick,
  onSelect,
}: HierarchyListItemProps) {
  const { t } = useTranslation();
  const { dragRef, isDragging, dragProps } = useDraggable(data, disableDrag);
  const { dropRef, isDropOver } = useDroppable(data, disableDrag);
  const { classes } = useItemStyles({ cols, isDragging, isDropOver });

  const isGroup = data.type === 'group';

  const editTitle = isGroup
    ? t('btn-edit-group')
    : t('btn-edit-item', {
        category: t(`ttl-breadcrumbs.${data.category}.label`),
      });

  return (
    <ImageListItem ref={dropRef}>
      <Card className={classes.card} {...dragProps}>
        <CardHeader
          title={data.title}
          titleTypographyProps={{
            variant: 'subtitle2',
            color: 'text.primary',
            component: Link,
            href: `/${data.category}/${
              isGroup ? data._id : `detail/${data._id}`
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
            <Avatar ref={dragRef} className={classes.dndToggle}>
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
            <Tooltip title={t('btn-delete')}>
              <ConfirmToggle
                subject={t('ttl-delete-confirm')}
                message={t('msg-delete-confirm', { name: data.title })}
                toggle={
                  <IconButton color="primary">
                    <Display.Icon code="faTrash" />
                  </IconButton>
                }
                onConfirm={() => onDeleteConfirm(data)}
              />
            </Tooltip>
          )}

          {!onPublishClick || isGroup ? null : (
            <Tooltip title={<Trans i18nKey="btn-publish" />}>
              <IconButton color="success" onClick={() => onPublishClick(data)}>
                <Display.Icon code="faShare" />
              </IconButton>
            </Tooltip>
          )}
        </CardActions>
      </Card>
    </ImageListItem>
  );
}
