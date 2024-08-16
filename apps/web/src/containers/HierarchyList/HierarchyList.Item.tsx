import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import Core from '@weavcraft/core';
import Divider from '@mui/material/Divider';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
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
  renderContent,
  onDeleteConfirm,
  onEditClick,
  onPublishClick,
}: HierarchyListItemProps<P>) {
  const { t } = useTranslation();
  const { dragRef, isDragging, props } = useDraggable(data, disableDrag);
  const { dropRef, isDropOver } = useDroppable(data);

  const isTutorialMode = useTutorialMode();
  const isGroup = data.type === EnumHierarchyType.GROUP;
  const isCustomContent = !isDragging && renderContent instanceof Function;

  const href = `${isTutorialMode ? '/tutorial' : ''}/${data.category}/${
    isGroup ? data.id : `detail/${data.id}`
  }`;

  const { classes } = useItemStyles({
    cols,
    isCustomContent,
    isDragging,
    isDropOver,
  });

  const editTitle = isGroup
    ? t('btn-edit-group')
    : t('btn-edit-item', {
        category: t(`ttl-breadcrumbs.${data.category}.label`),
      });

  return (
    <ImageListItem ref={dropRef}>
      <Card {...props.draggable} className={classes.card}>
        <CardHeader
          className={classes.header}
          title={data.title}
          subheader={
            data.description ? data.description : t('msg-no-description')
          }
          titleTypographyProps={{
            variant: 'subtitle1',
            color: 'text.primary',
          }}
          subheaderTypographyProps={{
            className: classes.description,
            variant: 'caption',
            color: 'text.secondary',
            whiteSpace: 'pre-line',
          }}
          avatar={
            <IconButton ref={dragRef} disabled={disableDrag} {...props.toggle}>
              <DragIndicatorIcon />
            </IconButton>
          }
        />

        <CardMedia className={classes.media}>
          <Link
            href={href}
            width="100%"
            fontSize={
              data.type !== EnumHierarchyType.ITEM || !isCustomContent
                ? '6rem'
                : undefined
            }
          >
            {data.type === EnumHierarchyType.GROUP && (
              <Core.Icon
                color="warning"
                fontSize="inherit"
                code={isDropOver ? 'faFolderOpen' : 'faFolder'}
              />
            )}

            {data.type === EnumHierarchyType.ITEM &&
              (isCustomContent ? (
                renderContent(data.payload)
              ) : (
                <Core.Icon code={icon} color="primary" fontSize="inherit" />
              ))}
          </Link>
        </CardMedia>

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
