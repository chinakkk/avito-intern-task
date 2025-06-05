import compose from 'compose-function';
import { withQueryClient } from 'src/app/providers/withQueryClient';
import { withStore } from 'src/app/providers/withStore';

export const withProviders = compose(withQueryClient, withStore);
