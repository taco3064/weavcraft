import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import ImageListItem from '@mui/material/ImageListItem';
import Typography from '@mui/material/Typography';
import { Display } from '@weavcraft/core';

import { useItemStyles } from './HierarchyList.styles';
import type { HierarchyListItemProps } from './HierarchyList.types';

export default function HierarchyListItem({
  actions,
  data,
  icon,
}: HierarchyListItemProps) {
  const { classes } = useItemStyles();
  const { type, title, description } = data;

  return (
    <ImageListItem>
      <Card className={classes.card}>
        <CardHeader
          titleTypographyProps={{ variant: 'subtitle2' }}
          title={title}
          avatar={
            <Avatar>
              <Display.Icon
                {...(type === 'group'
                  ? { code: 'faFolder', color: 'warning' }
                  : { code: icon, color: 'success' })}
              />
            </Avatar>
          }
        />

        {description && (
          <CardContent>
            <Typography
              role="textbox"
              variant="body2"
              color="text.secondary"
              className={classes.description}
            >
              {description}
            </Typography>
          </CardContent>
        )}

        <CardActions>{actions}</CardActions>
      </Card>
    </ImageListItem>
  );
}
