import { withProviders } from 'src/app/providers';
import { AppRouter } from 'src/app/router';
import { ComponentType } from 'react';

const AppWithProviders: ComponentType = withProviders(() => <AppRouter />);

AppWithProviders.displayName = 'AppWithProviders';

export default AppWithProviders;
