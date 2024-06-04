import Core from '@weavcraft/core';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import _get from 'lodash/get';
import { useTranslation } from 'next-i18next';

import NodeAction from './WidgetEditor.NodeAction';
import NodeItems from './WidgetEditor.NodeItems';
import { EditorList } from '~web/components';
import { usePathDescription, useWidgetNodePaths } from './WidgetEditor.hooks';
import type { NodeListProps } from './WidgetEditor.types';
import type { RenderConfig } from '~web/hooks';

export default function NodeList({
  config,
  active,
  onActive,
  onClose,
  onDelete,
  onEdit,
}: NodeListProps) {
  const { t } = useTranslation();

  const paths = useWidgetNodePaths(active);
  const description = usePathDescription(active);
  const node: RenderConfig = !paths.length ? config : _get(config, paths);

  return !node ? null : (
    <EditorList
      {...{ description, onClose }}
      key={active.join('|')}
      title={t('widgets:ttl-element-node')}
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

              <NodeAction
                {...{ onDelete, onEdit }}
                config={node}
                paths={active}
              />
            </ListItem>

            <NodeItems
              {...{ active, classes, onActive, onDelete, onEdit }}
              config={node}
            />
          </>
        );
      }}
    />
  );
}
