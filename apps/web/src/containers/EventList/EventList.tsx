import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'next-i18next';

import { EditorList } from '~web/components';
import { useNodePaths } from '~web/hooks';
import { useEventItems } from './EventList.hooks';
import type { EventListProps } from './EventList.types';

export default function EventList({
  config,
  widget,
  onActive,
  onClose,
}: EventListProps) {
  const { t } = useTranslation();
  const { getNodePaths } = useNodePaths();

  const items = useEventItems(widget.payload);

  console.log(items);

  return (
    <EditorList
      title={t('pages:ttl-widget-events')}
      description={widget.title}
      onClose={onClose}
      render={(classes) =>
        items.map(({ component, eventPath, nodePath, nodePaths }) => (
          <ListItemButton key={nodePath} className={classes.subitem}>
            <ListItemText
              secondary={nodePath || t('pages:lbl-root-node')}
              secondaryTypographyProps={{
                color: 'text.secondary',
                variant: 'caption',
              }}
              primaryTypographyProps={{
                color: 'secondary',
                display: 'flex',
                fontWeight: 500,
              }}
              primary={
                <>
                  {eventPath}
                  <Typography variant="inherit" color="text.primary">
                    ({t(`widgets:lbl-component.${component}`)})
                  </Typography>
                </>
              }
            />

            <ListItemIcon className={classes.icon}>
              <ChevronRightIcon />
            </ListItemIcon>
          </ListItemButton>
        ))
      }
    />
  );
}
