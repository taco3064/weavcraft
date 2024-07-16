import Container from '@mui/material/Container';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import type { GetServerSideProps } from 'next';

import { getServerSideTranslations } from '../pages.utils';
import { makePerPageLayout } from '~web/contexts';
import { usePageStyles } from '../pages.styles';

import {
  Breadcrumbs,
  MainLayout,
  UserSettings,
  type UserSettingType,
} from '~web/containers';

export default makePerPageLayout(MainLayout)(function UserSettingsPage() {
  const { t } = useTranslation();
  const { query } = useRouter();
  const { classes } = usePageStyles();

  return (
    <Container component="main" maxWidth="sm" className={classes.root}>
      <Breadcrumbs disableGutters currentPageTitle={t('ttl-user-settings')} />
      <UserSettings type={query.type as UserSettingType} />
    </Container>
  );
});

export const getServerSideProps: GetServerSideProps = async (ctx) => ({
  props: {
    ...(await getServerSideTranslations(ctx)),
  },
});
