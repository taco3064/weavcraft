import Badge from '@mui/material/Badge';
import Core from '@weavcraft/core';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import Typography from '@mui/material/Typography';
import { Fragment, useMemo } from 'react';
import { useTranslation } from 'next-i18next';

import Action from './ElementNodeList.Action';
import { usePropsDefinition } from '~web/contexts';
import type { ConfigPaths, RenderConfig } from '~web/hooks';

import type {
  ChildrenArray,
  ItemsProps,
  NodePaths,
} from './ElementNodeList.types';

export default function Items({
  active,
  classes,
  config,
  onActive,
  onDelete,
  onEdit,
}: ItemsProps) {
  const { widget, props = {} } = config;
  const { t } = useTranslation();
  const { getDefinition } = usePropsDefinition();

  const { nodePaths, onPathsGenerate, onWidgetChildrenGenerate } =
    useMemo<NodePaths>(() => {
      const { elementNodeProps = {} } = getDefinition(widget);

      return {
        nodePaths: Object.keys(elementNodeProps),

        onPathsGenerate: (nodePath, index, paths = []) => {
          const result: ConfigPaths = [...paths, nodePath];

          if (elementNodeProps[nodePath]?.definition?.multiple) {
            result.push(index);
          }

          return result;
        },
        onWidgetChildrenGenerate: ({ widget, props = {} }) => {
          const { elementNodeProps = {} } = getDefinition(widget);
          const nodePaths = Object.keys(elementNodeProps);

          return nodePaths.reduce<RenderConfig[]>((result, nodePath) => {
            const { [nodePath]: nodes } = props;

            if (nodes?.value && nodes.type === 'ElementNode') {
              const isMultiple = Array.isArray(nodes.value);

              result.push(
                ...((isMultiple
                  ? nodes.value
                  : [nodes.value]) as RenderConfig[])
              );
            }

            return result;
          }, []);
        },
      };
    }, [widget, getDefinition]);

  return nodePaths.reduce<ChildrenArray>((items, path) => {
    const { [path]: nodes } = props;

    if (nodes?.value && nodes.type === 'ElementNode') {
      const isMultiple = Array.isArray(nodes.value);

      const widgets = (
        isMultiple ? nodes.value : [nodes.value]
      ) as RenderConfig[];

      widgets.length &&
        items.push(
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

            {widgets.map((config, i) => {
              const hasChildren = onWidgetChildrenGenerate(config).length > 0;

              const content = (
                <>
                  <ListItemIcon className={classes.icon}>
                    <Badge
                      badgeContent={!isMultiple ? 0 : i + 1}
                      color="default"
                    >
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
        );
    }

    return items;
  }, []);
}
