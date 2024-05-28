import Core from '@weavcraft/core';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useMemo, type ReactNode } from 'react';
import { useTranslation } from 'next-i18next';

import StructureAction from './WidgetEditor.StructureAction';
import { useEditorListStyles } from '~web/styles';
import { usePropsDefinition } from '~web/contexts';
import type { RenderConfig } from '~web/hooks';
import type { StructureItemProps } from './WidgetEditor.types';

export default function StructureItem({
  config,
  paths,
  onActive,
  onDelete,
  onEdit,
}: StructureItemProps) {
  const { t } = useTranslation();
  const { getDefinition } = usePropsDefinition();
  const { classes } = useEditorListStyles();
  const { widget, props = {} } = config;

  const nodeProps = useMemo(() => {
    const { elementNodeProps = {} } = getDefinition(widget);

    return Object.entries(elementNodeProps);
  }, [widget, getDefinition]);

  const children = nodeProps.reduce<ReactNode[]>(
    (children, [nodePath, { definition }]) => {
      const { [nodePath]: nodes } = props;

      if (nodes?.value && nodes.type === 'ElementNode') {
        const widgets = (
          Array.isArray(nodes.value) ? nodes.value : [nodes.value]
        ) as RenderConfig[];

        children.push(
          ...widgets.map((config, i) => {
            const subPaths = [
              ...paths,
              nodePath,
              ...(definition?.multiple ? [i] : []),
            ];

            return (
              <ListItemButton
                key={`${nodePath}-${i}`}
                className={classes.subitem}
                onClick={() =>
                  onActive({
                    target: config,
                    paths: subPaths,
                  })
                }
              >
                <ListItemIcon className={classes.icon}>
                  <Core.Icon color="warning" code="faPuzzlePiece" />
                </ListItemIcon>

                <ListItemText
                  primary={t(`widgets:lbl-widgets.${config.widget}`)}
                  secondary={`${nodePath}${
                    definition?.multiple ? `[${i}]` : ''
                  }`}
                  primaryTypographyProps={{
                    color: 'text.primary',
                    fontWeight: 600,
                  }}
                  secondaryTypographyProps={{
                    variant: 'caption',
                    color: 'text.secondary',
                  }}
                />

                <StructureAction
                  {...{ config, onDelete, onEdit }}
                  paths={subPaths}
                />
              </ListItemButton>
            );
          })
        );
      }

      return children;
    },
    []
  );

  return (
    <>
      <ListItem>
        <ListItemIcon className={classes.icon}>
          <Core.Icon code={children.length ? 'faChevronDown' : 'faMinus'} />
        </ListItemIcon>

        <ListItemText
          primary={t(`widgets:lbl-widgets.${widget}`)}
          primaryTypographyProps={{
            color: 'text.primary',
            fontWeight: 600,
          }}
        />

        <StructureAction {...{ config, paths, onDelete, onEdit }} />
      </ListItem>

      {children}
    </>
  );
}
