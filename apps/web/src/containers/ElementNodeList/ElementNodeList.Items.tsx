import Badge from '@mui/material/Badge';
import Core from '@weavcraft/core';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import Typography from '@mui/material/Typography';
import { Fragment } from 'react';
import { useTranslation } from 'next-i18next';

import Action from './ElementNodeList.Action';
import { useNodePaths } from './ElementNodeList.hooks';
import type { ItemsProps } from './ElementNodeList.types';

export default function Items({
  active,
  classes,
  config,
  onActive,
  onDelete,
  onEdit,
}: ItemsProps) {
  const { t } = useTranslation();

  const { childGroups, onPathsGenerate, onWidgetChildrenGenerate } =
    useNodePaths(config);

  return childGroups.map(({ path, chidlren, showIndex }) => (
    <Fragment key={path}>
      <ListSubheader
        disableSticky
        className={classes.subitem}
        sx={{ lineHeight: 1.2 }}
      >
        <Typography variant="subtitle2" color="secondary">
          {path}
        </Typography>
      </ListSubheader>

      {chidlren.map((config, i) => {
        const hasChildren = onWidgetChildrenGenerate(config).length > 0;

        const content = (
          <>
            <ListItemIcon className={classes.icon}>
              <Badge badgeContent={!showIndex ? 0 : i + 1} color="default">
                <Core.Icon color="warning" code="faPuzzlePiece" />
              </Badge>
            </ListItemIcon>

            <ListItemText
              primary={t(`widgets:lbl-component.${config.component}`)}
              primaryTypographyProps={{
                color: hasChildren ? 'secondary' : 'text.primary',
                fontWeight: hasChildren ? 550 : 500,
              }}
            />

            <Action
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
    </Fragment>
  ));
}
