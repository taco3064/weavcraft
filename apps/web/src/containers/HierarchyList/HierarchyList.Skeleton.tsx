import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Container from '@mui/material/Container';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import LinearProgress from '@mui/material/LinearProgress';
import Skeleton from '@mui/material/Skeleton';

import { useItemStyles, useHierarchyStyles } from './HierarchyList.styles';
import type { HierarchyListSkeletonProps } from './HierarchyList.types';

export default function HierarchySkeleton({
  cols,
  disableGutters,
  maxWidth = false,
}: HierarchyListSkeletonProps) {
  const { classes: cls1 } = useHierarchyStyles();

  const { classes: cls2 } = useItemStyles({
    cols,
    isCustomContent: false,
    isDragging: false,
    isDropOver: false,
  });

  return (
    <Container {...{ disableGutters, maxWidth }} className={cls1.root}>
      <LinearProgress />

      <ImageList variant="masonry" className={cls1.list} cols={cols} gap={16}>
        {Array.from({ length: 6 }).map((_el, i) => (
          <ImageListItem key={i}>
            <Card className={cls2.card}>
              <CardHeader
                title={<Skeleton variant="text" />}
                titleTypographyProps={{ variant: 'subtitle2' }}
                avatar={<Skeleton variant="circular" width={40} height={40} />}
              />

              <CardContent>
                <Skeleton variant="text" />
                <Skeleton variant="text" />
              </CardContent>

              <CardActions>
                <Skeleton variant="circular" width={40} height={40} />
                <Skeleton variant="circular" width={40} height={40} />
              </CardActions>
            </Card>
          </ImageListItem>
        ))}
      </ImageList>
    </Container>
  );
}
