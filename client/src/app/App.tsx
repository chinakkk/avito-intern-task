import { withProviders } from 'src/app/providers';
import { AppRouter } from 'src/app/router';

const App = () => <AppRouter />;

export { App };
export default withProviders(App);
