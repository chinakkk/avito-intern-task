import compose from 'compose-function';
import { withQueryClient } from 'src/app/providers/withQueryClient';

export const withProviders = compose(
  withQueryClient,
  // withStore,
);
