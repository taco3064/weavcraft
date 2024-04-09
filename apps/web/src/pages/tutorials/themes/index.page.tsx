import type { GetServerSideProps } from 'next';
import { ThemesPage, getThemesServerSideProps } from '~web/pages/themes';

export default ThemesPage;

export const getServerSideProps: GetServerSideProps = async (context) =>
  getThemesServerSideProps(context, true);
