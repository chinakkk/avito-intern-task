import { withProviders } from 'src/app/providers';
import { AppRouter } from 'src/app/router';
import { IssueModal } from 'src/widgets/IssueModal';

const App = () => (
  <>
    <AppRouter />
    <IssueModal />
  </>
);

export { App };
export default withProviders(App);
