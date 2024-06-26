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
import { useCorePropsGetter } from '~web/contexts';
import type { ConfigPaths, ComponentConfig } from '~web/hooks';

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
  const getCoreProps = useCorePropsGetter();

  const { component, props = {} } = config;
  const { t } = useTranslation();

  const { nodePaths, onPathsGenerate, onWidgetChildrenGenerate } =
    useMemo<NodePaths>(() => {
      const { definition } = getCoreProps(component);
      const { elementNodeProps = {} } = definition;

      return {
        nodePaths: Object.keys(elementNodeProps),

        onPathsGenerate: (nodePath, index, paths = []) => {
          const result: ConfigPaths = [...paths, nodePath];

          if (elementNodeProps[nodePath]?.definition?.multiple) {
            result.push(index);
          }

          return result;
        },
        onWidgetChildrenGenerate: ({ component, props = {} }) => {
          const { definition } = getCoreProps(component);
          const { elementNodeProps = {} } = definition;
          const nodePaths = Object.keys(elementNodeProps);

          return nodePaths.reduce<ComponentConfig[]>((result, nodePath) => {
            const { [nodePath]: nodes } = props;

            if (nodes?.value && nodes.type === 'ElementNode') {
              const isMultiple = Array.isArray(nodes.value);

              result.push(
                ...((isMultiple
                  ? nodes.value
                  : [nodes.value]) as ComponentConfig[])
              );
            }

            return result;
          }, []);
        },
      };
    }, [component, getCoreProps]);

  return nodePaths.reduce<ChildrenArray>((items, path) => {
    const { [path]: nodes } = props;

    if (nodes?.value && nodes.type === 'ElementNode') {
      const isMultiple = Array.isArray(nodes.value);

      const components = (
        isMultiple ? nodes.value : [nodes.value]
      ) as ComponentConfig[];

      components.length &&
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

            {components.map((config, i) => {
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
        );
    }

    return items;
  }, []);
}
