import { getServerSideProps } from './_app.page';
import { makePerPageLayout } from '~web/contexts';
import { MainLayout } from '~web/containers';

export default makePerPageLayout(MainLayout)(function IndexPage() {
  return <>Index</>;
});

export { getServerSideProps };
