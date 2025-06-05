import React from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export const withQueryClient = (component: () => React.ReactNode) => () => {
  return (
    <QueryClientProvider client={new QueryClient()}>
      {component()}
    </QueryClientProvider>
  );
};
