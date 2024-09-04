import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Core from '@weavcraft/core';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { useTranslation } from 'next-i18next';

import ConfirmToggle from '../ConfirmToggle';
import { NODE_SIZE, TODO_ICONS } from './FlowNode.const';
import { useLabelStyles } from './FlowNode.styles';
import type { NodeLabelProps } from './FlowNode.types';

export default function NodeLabel({
  borderStyle = 'solid',
  children,
  description,
  size = NODE_SIZE,
  title,
  type,
  onDelete,
}: NodeLabelProps) {
  const { t } = useTranslation();
  const { classes } = useLabelStyles({ borderStyle, size, type });

  return (
    <Card className={classes.root}>
      <CardHeader
        classes={{ action: classes.action }}
        title={title}
        subheader={description}
        titleTypographyProps={{
          fontWeight: 'bolder',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          textTransform: 'capitalize',
          variant: 'subtitle2',
          whiteSpace: 'nowrap',
        }}
        subheaderTypographyProps={{
          variant: 'caption',
          textTransform: 'capitalize',
        }}
        avatar={
          <Avatar className={classes.avatar}>
            <Core.Icon code={TODO_ICONS[type]} color="inherit" />
          </Avatar>
        }
        action={
          <ConfirmToggle
            subject={t('ttl-delete-confirm')}
            onConfirm={onDelete}
            message={t('pages:msg-delete-todo-confirm', {
              name: title,
            })}
            toggle={
              <Tooltip title={t('pages:btn-delete-todo')}>
                <IconButton>
                  <Core.Icon color="disabled" code="faTrash" />
                </IconButton>
              </Tooltip>
            }
          />
        }
      />

      {children}
    </Card>
  );
}
