export type { ThemesPageProps } from './themes.types';

export {
  default as ThemesPage,
  getServerSideProps as getThemesServerSideProps,
} from './index.page';

export {
  default as ThemeGroupsPage,
  getServerSideProps as getThemeGroupsServerSideProps,
} from './[group].page';
