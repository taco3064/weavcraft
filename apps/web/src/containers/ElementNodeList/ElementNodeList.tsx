import Core from '@weavcraft/core';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import _get from 'lodash/get';
import { useTranslation } from 'next-i18next';

import Action from './ElementNodeList.Action';
import Items from './ElementNodeList.Items';
import { EditorList } from '~web/components';
import { useWidgetNodePaths } from '~web/hooks';
import type { ElementNodeListProps } from './ElementNodeList.types';
import type { RenderConfig } from '../imports.types';

export default function ElementNodeList({
  config,
  active,
  onActive,
  onClose,
  onDelete,
  onEdit,
}: ElementNodeListProps) {
  const { t } = useTranslation();
  const { nodePaths, pathDescription } = useWidgetNodePaths(active);

  const node: RenderConfig = !nodePaths.length
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

        return (
          <>
            <ListItem>
              <ListItemIcon className={classes.icon}>
                {!active.length ? (
                  <Core.Icon color="disabled" code="faMinus" />
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

              <Action {...{ onDelete, onEdit }} config={node} paths={active} />
            </ListItem>

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
