import type { GetServerSideProps } from 'next';

import {
  ThemeGroupsPage,
  getThemeGroupsServerSideProps,
} from '~web/pages/themes';

export default ThemeGroupsPage;

export const getServerSideProps: GetServerSideProps = async (context) =>
  getThemeGroupsServerSideProps(context, true);
