import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import type { GetServerSideProps } from 'next';

import { MainLayout } from '~web/containers';
import { getSuperiorHierarchies } from '~web/services';
import { makePerPageLayout } from '~web/contexts';

import {
  ThemeGroupsPage,
  getThemeGroupsServerSideProps,
  type ThemesPageProps,
} from '~web/pages/themes';

export default makePerPageLayout<ThemesPageProps>(MainLayout)(
  function TutorialThemeGroupsPage(props) {
    const { query } = useRouter();

    const { data } = useQuery({
      queryKey: [query.group as string, true],
      queryFn: getSuperiorHierarchies,
    });

    return <ThemeGroupsPage {...props} superiors={data || []} />;
  }
);

export const getServerSideProps: GetServerSideProps = (context) =>
  getThemeGroupsServerSideProps(context, true);
