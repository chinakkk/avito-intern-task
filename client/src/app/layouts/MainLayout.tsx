import { Header } from 'src/widgets';
import { Outlet } from 'react-router-dom';
import { Suspense } from 'react';
import { Skeleton } from 'antd';
import { GlobalModalProvider } from 'src/shared/lib/modal/GlobalModalContext';

export const MainLayout = () => {
  return (
    <GlobalModalProvider>
      <Header />
      <main>
        <Suspense fallback={<Skeleton />}>
          <Outlet />
        </Suspense>
      </main>
    </GlobalModalProvider>
  );
};
