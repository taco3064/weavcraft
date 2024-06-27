import Core from '@weavcraft/core';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import _get from 'lodash/get';
import { useTranslation } from 'next-i18next';

import Action from './ElementNodeList.Action';
import Items from './ElementNodeList.Items';
import { EditorList } from '~web/components';
import { useNodePaths } from '~web/hooks';
import type { ElementNodeListProps } from './ElementNodeList.types';
import type { ComponentConfig } from '../imports.types';

export default function ElementNodeList({
  config,
  active,
  onActive,
  onClose,
  onDelete,
  onEdit,
}: ElementNodeListProps) {
  const { t } = useTranslation();
  const { nodePaths, pathDescription } = useNodePaths(active);

  const node: ComponentConfig = !nodePaths.length
    ? config
    : _get(config, nodePaths);

  return !node ? null : (
    <EditorList
      key={active.join('|')}
      title={t('widgets:ttl-element-node')}
      description={pathDescription}
      onClose={onClose}
      render={(classes) => {
        const isMultiple = typeof active[active.length - 1] === 'number';

        const currentComponent = (
          <>
            <ListItemText
              primary={t(`widgets:lbl-component.${node.component}`)}
              primaryTypographyProps={{
                color: 'text.primary',
                fontWeight: 600,
              }}
            />

            <Action {...{ onDelete, onEdit }} config={node} paths={active} />
          </>
        );

        return (
          <>
            {!active.length ? (
              <ListItem>
                <ListItemIcon className={classes.icon}>
                  <Core.Icon color="disabled" code="faMinus" />
                </ListItemIcon>

                {currentComponent}
              </ListItem>
            ) : (
              <ListItemButton
                onClick={() => onActive(active.slice(0, isMultiple ? -2 : -1))}
              >
                <ListItemIcon className={classes.icon}>
                  <Core.Icon code="faChevronLeft" />
                </ListItemIcon>

                {currentComponent}
              </ListItemButton>
            )}

            <Items
              {...{ active, classes, onActive, onDelete, onEdit }}
              config={node}
            />
          </>
        );
      }}
    />
  );
}
