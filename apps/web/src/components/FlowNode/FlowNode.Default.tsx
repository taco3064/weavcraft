import Core from '@weavcraft/core';
import IconButton from '@mui/material/IconButton';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Tooltip from '@mui/material/Tooltip';
import { Position, useReactFlow } from '@xyflow/react';
import { useTranslation } from 'next-i18next';

import ConfirmToggle from '../ConfirmToggle';
import { FlowHandle } from '~web/styles';
import { TODO_ICONS, TODO_SOURCE } from './FlowNode.const';
import { useMainStyles } from './FlowNode.styles';
import type { FlowNodeProps } from './FlowNode.types';

export default function FlowNode({ data, id, selected }: FlowNodeProps) {
  const { type, description } = data;
  const { t } = useTranslation();
  const { deleteElements } = useReactFlow();
  const { classes } = useMainStyles({ type });

  return (
    <>
      <FlowHandle type="target" position={Position.Top} />

      {Object.entries(TODO_SOURCE[type] || { next: Position.Bottom }).map(
        ([id, position]) => (
          <Tooltip key={id} title={t(`pages:opt-source-types.${id}`)}>
            <FlowHandle id={id} position={position} type="source" />
          </Tooltip>
        )
      )}

      <ListItemButton {...{ selected }} disableGutters className={classes.root}>
        <ListItemIcon className={classes.icon}>
          <Core.Icon code={TODO_ICONS[type]} color="inherit" />
        </ListItemIcon>

        <ListItemText
          primary={description || id}
          secondary={t(`pages:lbl-todo-types.${type}`)}
          primaryTypographyProps={{
            color: 'inherit',
            fontWeight: 'bolder',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            textTransform: 'capitalize',
            variant: 'subtitle1',
            whiteSpace: 'nowrap',
          }}
          secondaryTypographyProps={{
            color: 'inherit',
            variant: 'caption',
            textTransform: 'capitalize',
            display: 'flex',
          }}
        />

        <ConfirmToggle
          subject={t('ttl-delete-confirm')}
          onConfirm={() => deleteElements({ nodes: [{ id }] })}
          message={t('pages:msg-delete-todo-confirm', {
            name: description || id,
          })}
          toggle={
            <Tooltip title={t('pages:btn-delete-todo')}>
              <IconButton color="primary">
                <Core.Icon code="faTrash" />
              </IconButton>
            </Tooltip>
          }
        />
      </ListItemButton>
    </>
  );
}
