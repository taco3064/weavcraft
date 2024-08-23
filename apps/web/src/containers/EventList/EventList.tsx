import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Core from '@weavcraft/core';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import Typography from '@mui/material/Typography';
import { Fragment } from 'react';
import { useTranslation } from 'next-i18next';

import { EditorList } from '~web/components';
import { useEventItems } from './EventList.hooks';
import type { EventListProps } from './EventList.types';

export default function EventList({
  widget,
  onActive,
  onClose,
}: EventListProps) {
  const { t } = useTranslation();
  const items = useEventItems(widget.payload);

  return (
    <EditorList
      title={t('pages:ttl-widget-events')}
      description={widget.title}
      onClose={onClose}
      render={(classes) =>
        items.map(([nodePath, items], i) => (
          <Fragment key={nodePath}>
            <ListSubheader
              disableSticky
              className={classes.subitem}
              sx={{
                lineHeight: 1.2,
                marginTop: (theme) => theme.spacing(i === 0 ? 3 : 0),
              }}
            >
              <ListItemIcon className={classes.icon} />

              <Typography variant="subtitle2" color="secondary">
                {nodePath || t('pages:lbl-root-node')}
              </Typography>
            </ListSubheader>

            {items.map(({ config, eventPath }) => (
              <ListItemButton
                key={`${config.id}.${eventPath}`}
                className={classes.subitem}
                onClick={() => onActive({ config, eventPath })}
              >
                <ListItemIcon className={classes.icon}>
                  <Core.Icon color="warning" code="faClipboard" />
                </ListItemIcon>

                <ListItemText
                  primary={eventPath}
                  secondary={t(`widgets:lbl-component.${config.component}`)}
                  primaryTypographyProps={{
                    display: 'flex',
                    fontWeight: 550,
                  }}
                  secondaryTypographyProps={{
                    color: 'text.secondary',
                    variant: 'caption',
                  }}
                />

                <ListItemIcon className={classes.icon}>
                  <ChevronRightIcon />
                </ListItemIcon>
              </ListItemButton>
            ))}
          </Fragment>
        ))
      }
    />
  );
}
