import Divider from '@mui/material/Divider';
import Fade from '@mui/material/Fade';
import List from '@mui/material/List';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import _get from 'lodash/get';
import { Trans } from 'next-i18next';

import StructureItem from './WidgetEditor.StructureItem';
import { useEditorListStyles } from '~web/styles';
import { useWidgetNodePaths } from './WidgetEditor.hooks';
import type { RenderConfig } from '~web/hooks';
import type { StructureProps } from './WidgetEditor.types';

export default function Structure({
  action,
  config,
  active,
  onActive,
  onDelete,
  onEdit,
}: StructureProps) {
  const { classes } = useEditorListStyles();

  const paths = useWidgetNodePaths(active);
  const widget: RenderConfig = !paths.length ? config : _get(config, paths);

  return (
    <Fade in timeout={1200}>
      <List
        className={classes.root}
        subheader={
          <>
            <ListSubheader>
              {action && (
                <ListItemIcon className={classes.icon}>{action}</ListItemIcon>
              )}

              <ListItemText
                primary={<Trans i18nKey="widgets:ttl-structure" />}
                primaryTypographyProps={{
                  variant: 'h6',
                  color: 'text.primary',
                  fontWeight: 600,
                }}
              />
            </ListSubheader>

            <Divider />
          </>
        }
      >
        {widget && (
          <StructureItem
            {...{ onActive, onDelete, onEdit }}
            config={widget}
            paths={active}
          />
        )}
      </List>
    </Fade>
  );
}
