import Badge from '@mui/material/Badge';
import Core from '@weavcraft/core';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import { useTranslation } from 'next-i18next';

import NodeAction from './WidgetEditor.NodeAction';
import type { NodeItemProps } from './WidgetEditor.types';

export default function NodeItem({
  active,
  classes,
  isMultiple,
  path,
  widgets,
  onActive,
  onDelete,
  onEdit,
  onPathsGenerate,
  onWidgetChildrenGenerate,
}: NodeItemProps) {
  const { t } = useTranslation();

  return (
    <>
      <ListSubheader
        disableSticky
        className={classes.subitem}
        sx={{ lineHeight: 1.2 }}
      >
        {path}
      </ListSubheader>

      {widgets.map((config, i) => {
        const hasChildren = onWidgetChildrenGenerate(config).length > 0;

        const content = (
          <>
            <ListItemIcon className={classes.icon}>
              <Badge badgeContent={!isMultiple ? 0 : i + 1} color="default">
                <Core.Icon color="warning" code="faPuzzlePiece" />
              </Badge>
            </ListItemIcon>

            <ListItemText
              primary={t(`widgets:lbl-widgets.${config.widget}`)}
              primaryTypographyProps={{
                color: hasChildren ? 'secondary' : 'text.primary',
                fontWeight: hasChildren ? 550 : 500,
              }}
            />

            <NodeAction
              {...{ config, onDelete, onEdit }}
              paths={onPathsGenerate(path, i, active)}
            />
          </>
        );

        return !hasChildren ? (
          <ListItem key={`${path}-${i}`} className={classes.subitem}>
            {content}
          </ListItem>
        ) : (
          <ListItemButton
            key={`${path}-${i}`}
            className={classes.subitem}
            onClick={() => onActive(onPathsGenerate(path, i, active))}
          >
            {content}
          </ListItemButton>
        );
      })}
    </>
  );
}
