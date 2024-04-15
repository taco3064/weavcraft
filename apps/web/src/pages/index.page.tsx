import Container from '@mui/material/Container';
import type { GetServerSideProps } from 'next';

import { MainLayout } from '~web/containers';
import { getServerSideTranslations } from './pages.utils';
import { makePerPageLayout } from '~web/contexts';
import { usePageStyles } from './pages.styles';

export default makePerPageLayout(MainLayout)(function IndexPage() {
  const { classes } = usePageStyles();

  return (
    <Container
      disableGutters
      component="main"
      maxWidth="md"
      className={classes.root}
    >
      Index
    </Container>
  );
});

export const getServerSideProps: GetServerSideProps = async (ctx) => ({
  props: {
    ...(await getServerSideTranslations(ctx)),
  },
});
