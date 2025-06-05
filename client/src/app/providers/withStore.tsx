import React, { FC } from 'react';

import { Provider } from 'react-redux';
import { store } from 'src/app/reducers/store';

export const withStore = (Component: FC) => () => {
  return <Provider store={store}>{<Component />}</Provider>;
};
