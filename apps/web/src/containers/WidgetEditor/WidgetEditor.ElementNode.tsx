import Badge from '@mui/material/Badge';
import Core from '@weavcraft/core';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import _get from 'lodash/get';
import { Fragment } from 'react';
import { useTranslation } from 'next-i18next';

import NodeAction from './WidgetEditor.NodeAction';
import { EditorList } from '~web/components';
import { useNodeItemsRender, useWidgetNodePaths } from './WidgetEditor.hooks';
import type { ElementNodeProps } from './WidgetEditor.types';
import type { RenderConfig } from '~web/hooks';

export default function ElementNode({
  config,
  active,
  onActive,
  onClose,
  onDelete,
  onEdit,
}: ElementNodeProps) {
  const { t } = useTranslation();

  const paths = useWidgetNodePaths(active);
  const node: RenderConfig = !paths.length ? config : _get(config, paths);

  const renderItems = useNodeItemsRender(
    ({ classes, isMultiple, nodePath, widgets, getPaths }) => (
      <Fragment key={nodePath}>
        <ListSubheader disableSticky className={classes.subitem}>
          {nodePath}
        </ListSubheader>

        {widgets.map((config, i) => (
          <ListItemButton
            key={`${nodePath}-${i}`}
            className={classes.subitem}
            onClick={() => onActive(getPaths(nodePath, i, active))}
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

            <NodeAction
              {...{ config, onDelete, onEdit }}
              paths={getPaths(nodePath, i, active)}
            />
          </ListItemButton>
        ))}
      </Fragment>
    ),
    node
  );

  return !node ? null : (
    <EditorList
      key={active.join('|')}
      title={t('widgets:ttl-element-node')}
      onClose={onClose}
      render={(classes) => {
        const isMultiple = typeof active[active.length - 1] === 'number';
        const items = renderItems(classes);

        return (
          <>
            <ListItem>
              <ListItemIcon className={classes.icon}>
                {!active.length ? (
                  <Core.Icon
                    color="disabled"
                    code={items.length ? 'faChevronDown' : 'faMinus'}
                  />
                ) : (
                  <IconButton
                    size="large"
                    onClick={() =>
                      onActive(active.slice(0, isMultiple ? -2 : -1))
                    }
                  >
                    <Core.Icon code="faChevronLeft" />
                  </IconButton>
                )}
              </ListItemIcon>

              <ListItemText
                primary={t(`widgets:lbl-widgets.${node.widget}`)}
                primaryTypographyProps={{
                  color: 'text.primary',
                  fontWeight: 600,
                }}
              />

              <NodeAction
                {...{ onDelete, onEdit }}
                config={node}
                paths={active}
              />
            </ListItem>

            {items}
          </>
        );
      }}
    />
  );
}
