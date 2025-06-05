import React, { FC } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export const withQueryClient = (Component: FC) => () => {
  return <QueryClientProvider client={queryClient}>{<Component />}</QueryClientProvider>;
};
