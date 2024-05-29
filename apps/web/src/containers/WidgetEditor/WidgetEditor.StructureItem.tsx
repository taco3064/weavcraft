import Badge from '@mui/material/Badge';
import Core from '@weavcraft/core';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import { Fragment } from 'react';
import { useTranslation } from 'next-i18next';

import StructureAction from './WidgetEditor.StructureAction';
import { useEditorListStyles } from '~web/styles';
import { useStructureItemsRender } from './WidgetEditor.hooks';
import type { StructureItemProps } from './WidgetEditor.types';

export default function StructureItem({
  config,
  paths,
  onActive,
  onDelete,
  onEdit,
}: StructureItemProps) {
  const { t } = useTranslation();
  const { classes } = useEditorListStyles();

  console.log(paths);

  const items = useStructureItemsRender(
    config,
    ({ isMultiple, nodePath, widgets, getPaths }) => (
      <Fragment key={nodePath}>
        <ListSubheader disableSticky className={classes.subitem}>
          {nodePath}
        </ListSubheader>

        {widgets.map((config, i) => (
          <ListItemButton
            key={`${nodePath}-${i}`}
            className={classes.subitem}
            onClick={() => onActive(getPaths(nodePath, i, paths))}
          >
            <ListItemIcon className={classes.icon}>
              <Badge badgeContent={!isMultiple ? 0 : i + 1} color="default">
                <Core.Icon color="warning" code="faPuzzlePiece" />
              </Badge>
            </ListItemIcon>

            <ListItemText
              primary={t(`widgets:lbl-widgets.${config.widget}`)}
              primaryTypographyProps={{
                color: 'text.primary',
                fontWeight: 600,
              }}
            />

            <StructureAction
              {...{ config, onDelete, onEdit }}
              paths={getPaths(nodePath, i, paths)}
            />
          </ListItemButton>
        ))}
      </Fragment>
    )
  );

  return (
    <>
      <ListItem>
        <ListItemIcon className={classes.icon}>
          {!paths.length ? (
            <Core.Icon
              color="disabled"
              code={items.length ? 'faChevronDown' : 'faMinus'}
            />
          ) : (
            <IconButton
              size="large"
              onClick={() =>
                onActive(
                  paths.slice(
                    0,
                    typeof paths[paths.length - 1] === 'string' ? -1 : -2
                  )
                )
              }
            >
              <Core.Icon code="faChevronLeft" />
            </IconButton>
          )}
        </ListItemIcon>

        <ListItemText
          primary={t(`widgets:lbl-widgets.${config.widget}`)}
          primaryTypographyProps={{
            color: 'text.primary',
            fontWeight: 600,
          }}
        />

        <StructureAction {...{ config, paths, onDelete, onEdit }} />
      </ListItem>

      {items}
    </>
  );
}
