import { MainLayout } from '~web/containers';
import { makePerPageLayout } from './_app.page';

export default makePerPageLayout(MainLayout)(function IndexPage() {
  return <>Index</>;
});
