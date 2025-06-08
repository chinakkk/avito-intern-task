import { withProviders } from 'src/app/providers';
import { AppRouter } from 'src/app/router';
import ErrorBoundary from 'antd/es/alert/ErrorBoundary';
import { Suspense } from 'react';
import { Spin } from 'antd';

const App = () => (
  <ErrorBoundary>
    <Suspense fallback={<Spin />}>
      <AppRouter />
    </Suspense>
  </ErrorBoundary>
);

export { App };
export default withProviders(App);
